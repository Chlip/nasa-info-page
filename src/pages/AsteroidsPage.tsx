import { Box } from "@mui/material";
import React, { useState } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import { useGetDataQuery } from "../services/asteroidsApi";

interface IAsteroidsPage {}

const AsteroidsPage: React.FunctionComponent<IAsteroidsPage> = () => {
  
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));
  const { data, error, isLoading } = useGetDataQuery({ sd: startDate, ed: endDate })
  console.log(data);
  

  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center",alignItems:"start" }}>
      Asteroids
    </Box>
  );
};

export default AsteroidsPage;
