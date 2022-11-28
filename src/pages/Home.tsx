import { Box } from "@mui/material";
import React from "react";
import Thumbnail from "../components/Thumbnail/Thumbnail";
import { useGetPictureQuery } from "../services/apodApi";

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const { data, error, isLoading } = useGetPictureQuery("2017-07-09");
  console.log(data);

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
      {!isLoading && (
        <Thumbnail
          img={data.url}
          title={"Astronomy Picture Of The Day"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/apod'}
        ></Thumbnail>
      )}

      <Thumbnail></Thumbnail>
      <Thumbnail></Thumbnail>
    </Box>
  );
};

export default HomePage;
