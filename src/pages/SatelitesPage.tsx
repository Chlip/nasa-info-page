import { Box } from "@mui/material";
import React, { useState } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import { useGetCollectionQuery } from "../services/tleApi";


interface ISatelitesPage {}

const SatelitesPage: React.FunctionComponent<ISatelitesPage> = () => {
  
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));
  const { data, error, isLoading } = useGetCollectionQuery({ps:5, sort:"popularity" });
  console.log(data);
  

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center",alignItems:"start" }}>
      satelites
    </Box>
  );
};

export default SatelitesPage;
