import { Box, Paper } from "@mui/material";
import React from "react";
import { useGetDataQuery } from "../services/marsWeatherApi";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";


interface IMarsWeatherPage {}

const MarsWeatherPage: React.FunctionComponent<IMarsWeatherPage> = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useGetDataQuery("");
  const columns: GridColDef[] = [
    { field: "col1", headerName: "terrestrial_date", width: 150 },
    { field: "col2", headerName: "local_uv_irradiance_index", width: 150 },
    { field: "col3", headerName: "sunset", width: 150 },
    { field: "col4", headerName: "sunrise", width: 150 },
    { field: "col5", headerName: "pressure", width: 150 },
    { field: "col6", headerName: "min_temp", width: 150 },
    { field: "col7", headerName: "max_temp", width: 150 },
  ];

  const d = [
    { argument: 1, value: 10 },
    { argument: 2, value: 20 },
    { argument: 3, value: 30 },
  ];
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "start",
          p: 4,
        }}
      >
        {isLoading ? (
          "fetching"
        ) : (
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              rows={data.soles.map((e: any) => {
                return {
                  id: e.id,
                  col1: e.terrestrial_date,
                  col2: e.local_uv_irradiance_index,
                  col3: e.sunset,
                  col4: e.sunrise,
                  col5: e.pressure,
                  col6: e.min_temp,
                  col7: e.max_temp,
                };
              })}
              columns={columns}
            />
          </div>
        )}
      </Box>
    </React.Fragment>
  );
};

export default MarsWeatherPage;
