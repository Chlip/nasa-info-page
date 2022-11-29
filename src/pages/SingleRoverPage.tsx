import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Thumbnail from "../components/Thumbnail/Thumbnail";
import { useGetRoverLatestPhotoQuery } from "../services/marsRoverPhotoApi";

interface ISingleRoverPage {}

const SingleRoverPage: React.FunctionComponent<ISingleRoverPage> = () => {
  const { data, error, isLoading } = useGetRoverLatestPhotoQuery(`${(window.location.pathname.split("/").pop())}`);
  console.log(data);
  return (
    <React.Fragment>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          alignItems: "start",
        }}
      >single rover page</Box>
    </React.Fragment>
  );
};

export default SingleRoverPage;
