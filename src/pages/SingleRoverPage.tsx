import {
  Box,
  CircularProgress,
  ImageList,
  ImageListItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import React from "react";
import {
  ScatterChart,
  Scatter,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Tooltip,
  Bar,
  BarChart,
  ResponsiveContainer,
} from "recharts";
import Thumbnail from "../components/Thumbnail/Thumbnail";
import { useGetRoverLatestPhotoQuery } from "../services/marsRoverPhotoApi";

interface ISingleRoverPage {}

const SingleRoverPage: React.FunctionComponent<ISingleRoverPage> = () => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down("lg"));
  const { data, error, isLoading } = useGetRoverLatestPhotoQuery(
    `${window.location.pathname.split("/").pop()}`
  );
  console.log(data);
  const columns: GridColDef[] = [
    { field: "date", headerName: "date", width: 150 },
    { field: "img", headerName: "img", width: 150 },
  ];
  const modifiedData =
    !isLoading &&
    data.latest_photos.map((e: any) => {
      return {
        id: e.id,
        date: e.earth_date,
        img: e.img_src,
        camera: e.camera.name,
        cameraName: e.camera.full_name,
      };
    });
  const counts: any = [];
  if (!isLoading) {
    for (const el of modifiedData) {
      counts[el.camera] = counts[el.camera] ? counts[el.camera] + 1 : 1;
    }
  }
  console.log(counts);
  let picturesPerCamera = [];
  if (!isLoading && counts !== null) {
    for (const [key, value] of Object.entries(counts)) {
      console.log(`${key}: ${value}`);
      picturesPerCamera.push({ name: `${key}`, amount: `${value}` });
    }
  }
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "start",
        }}
      >
        {isLoading ? (
          "fetching"
        ) : (
          <>
            <div style={{ height: 700, width: "100%" }}>
              <DataGrid rows={modifiedData} columns={columns} />
            </div>
            <Box sx={{ display: "flex", flexDirection: "column" }}>
              <ResponsiveContainer width="95%" height={500}>
                <BarChart data={picturesPerCamera}>
                  <CartesianGrid />
                  <XAxis dataKey="name" />
                  <YAxis type="number" domain={[0, modifiedData.length]} />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="amount" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <ImageList
                sx={{ width: "100%", height: 450 }}
                variant="quilted"
                cols={matchDownMd ? 1 : 3}
                rowHeight={121}
              >
                {data.latest_photos.map((item: any) => (
                  <ImageListItem key={item.id}>
                    <img
                      src={item.img_src}
                      alt={item.title}
                      loading="lazy"
                      onClick={() => {
                        window.open(
                          item.img_src,
                          "_blank",
                          "noopener,noreferrer"
                        );
                      }}
                    />
                  </ImageListItem>
                ))}
              </ImageList>
            </Box>
          </>
        )}
      </Box>
    </React.Fragment>
  );
};

export default SingleRoverPage;
