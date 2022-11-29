import { Box, CircularProgress } from "@mui/material";
import React from "react";
import Thumbnail from "../components/Thumbnail/Thumbnail";
import { useGetRoversQuery } from "../services/marsRoverPhotoApi";

interface IMarsRoverPage {}

const MarsRoverPage: React.FunctionComponent<IMarsRoverPage> = () => {
  const { data, error, isLoading } = useGetRoversQuery("");
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
      >
        {isLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          data.rovers.map((rover: any) => {
            return (
              <Thumbnail
                key={rover.name}
                img={"https://apod.nasa.gov/apod/image/2211/Gum_Lima_1365.jpg"}
                title={rover.name}
                link={rover.name}
                text={`status: ${rover.status}
                    landing date: ${rover.landing_date}
                    launch date: ${rover.launch_date}
                    total photos: ${rover.total_photos}
                `}
              ></Thumbnail>
              
            );
          })
        )}
      </Box>
    </React.Fragment>
  );
};

export default MarsRoverPage;
