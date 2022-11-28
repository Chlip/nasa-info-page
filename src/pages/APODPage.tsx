import { Box } from "@mui/material";
import React from "react";
import Thumbnail from "../components/Thumbnail/Thumbnail";
import { useGetPictureQuery } from "../services/apodApi";

interface IAPODPage {}

const APODPage: React.FunctionComponent<IAPODPage> = () => {
  const { data, error, isLoading } = useGetPictureQuery('')
  console.log(data)
  
  return (
    <Box sx={{ display: 'flex',  flexWrap: 'wrap', justifyContent: 'center'}}>
      asdsdssddsds
    </Box>
  );
};

export default APODPage;