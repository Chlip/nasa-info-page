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
              <ScatterChart width={400} height={400} data={modifiedData}>
                <Scatter name="id" dataKey={'id'} fill="#8884d8" />
                
                <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                <XAxis dataKey={"date"} />
                <YAxis />
                <Tooltip />
                <Legend verticalAlign="top" height={36} />
              </ScatterChart>
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
