import { Box } from "@mui/material";
import React, { useState } from "react";

import CircularProgress from '@mui/material/CircularProgress';
import { useGetCollectionQuery } from "../services/tleApi";
import { getGroundTracks, getLatLngObj } from "tle.js";


interface ISatelitesPage {}

const SatelitesPage: React.FunctionComponent<ISatelitesPage> = () => {
  
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));
  const { data, error, isLoading, isFetching } = useGetCollectionQuery({ps:5, sort:"popularity" });
  console.log(data);
  const sat = !isLoading && data.member.map((el:any) => `${el.name}
  ${el.line1}
  ${el.line2}`)
  console.log(sat)
//   const latLonObj = !isLoading && !isFetching && getLatLngObj(sat[0]);
//   console.log(latLonObj)

  
!isLoading && !isFetching && sat.forEach((s:any)=>{
    try{
        !isLoading && !isFetching && sat.length!=0 && getGroundTracks({
            tle: s,
            startTimeMS: 1502342329860,
            stepMS: 1000,
            isLngLatFormat: true,
        }).then((res:any)=>{
            console.log(`---------${s.split('\n')[0]}---------`)
            console.log(res)
            
        });
    }
    catch{
        console.log('err')
    }
})
  return (
    <Box sx={{ display: "flex", flexWrap: "wrap", justifyContent: "center",alignItems:"start" }}>
      satelites
    </Box>
  );
};

export default SatelitesPage;
