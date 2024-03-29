import { Box } from "@mui/material";
import React from "react";
import Thumbnail from "../components/Thumbnail/Thumbnail";
import {  useGetRecentPictureQuery } from "../services/apodApi";
import CircularProgress from '@mui/material/CircularProgress';

interface IHomePageProps {}

const HomePage: React.FunctionComponent<IHomePageProps> = () => {
  const { data, error, isLoading } = useGetRecentPictureQuery('')
  
  console.log(data);
  

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center",alignItems:"start" }}>
      {isLoading ?'': (
        <Thumbnail
          img={data.url}
          title={"Astronomy Picture Of The Day"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/apod'}
        ></Thumbnail>
      )}
      
      <Thumbnail
          img={'https://apod.nasa.gov/apod/image/0107/mars_hst_big.jpg'}
          title={"Mars Weather"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/marsweather'}
        ></Thumbnail>
        <Thumbnail
          img={'https://mars.nasa.gov/mars2020-raw-images/pub/ods/surface/sol/00629/ids/edr/browse/ncam/NLF_0629_0722798091_508ECM_N0302188NCAM03629_12_095J01_1200.jpg'}
          title={"Mars Rover Photos"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/marsrover'}
        ></Thumbnail>
        <Thumbnail
          img={'https://apod.nasa.gov/apod/image/0406/idadactyl_galileo_big.gif'}
          title={"Asteroids Near Earth"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/asteroids'}
        ></Thumbnail>
        <Thumbnail
          img={'https://apod.nasa.gov/apod/image/0208/earthlights02_dmsp_big.jpg'}
          title={"Satelites Near Earth"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/satelites'}
        ></Thumbnail>
        <Thumbnail
          img={'https://apod.nasa.gov/apod/image/0501/earth_apollo17_big.gif'}
          title={"Earth View From Space"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/earthview'}
        ></Thumbnail>
        <Thumbnail
          img={'https://apod.nasa.gov/apod/image/9703/seaice_sts45_big.jpg'}
          title={"Earth Weather From Space"}
          text={
            "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Aut maxime sint temporibus incidunt vel deserunt unde, qui voluptates voluptate, a saepe dolorem vero tenetur consectetur quisquam ducimus. Libero, laboriosam quia?"
          }
          link={'/earthweather'}
        ></Thumbnail>
    </Box>
  );
};

export default HomePage;
