import { Box } from "@mui/material";
import React from "react";
import { useGetDataQuery } from "../services/marsWeatherApi";

interface IMarsWeatherPage {}

const MarsWeatherPage: React.FunctionComponent<IMarsWeatherPage> = () => {
  const { data, error, isLoading } = useGetDataQuery("");
  console.log(data);
  //   if (!isLoading) {
  //     const { sol_keys, validity_checks, ...solData } = data;
  //     const temp = Object.entries(solData).map(([sol, d]: any) => {
  //       return {
  //         sol: sol,
  //         maxTemp: d.AT.mx,
  //         minTemp: d.AT.mn,
  //         windSpeed: data.HWS.av,
  //         windDirectionDegrees: data.WD.most_common.compass_degrees,
  //         windDirectionCardinal: data.WD.most_common.compass_point,
  //         date: new Date(data.First_UTC),
  //       };
  //     });
  //     console.log(temp);
  //   }
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
        <iframe
          title="test"
          src="https://mars.nasa.gov/layout/embed/image/mslweather/"
          width="800"
          height="530"
          scrolling="no"
          
        ></iframe>
      </Box>
    </React.Fragment>
  );
};

export default MarsWeatherPage;
