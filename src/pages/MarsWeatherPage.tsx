import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
} from "@mui/material";
import React, { useState } from "react";
import { useGetDataQuery } from "../services/marsWeatherApi";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Scatter,
  ScatterChart,
} from "recharts";

interface IMarsWeatherPage {}

const MarsWeatherPage: React.FunctionComponent<IMarsWeatherPage> = () => {
  const { data, error, isLoading, isFetching, isSuccess } = useGetDataQuery("");
  const [paramX, setParamX] = useState("min");
  const [paramY, setParamY] = useState("max");
  const [amount, setAmount] = useState(10);
  const columns: GridColDef[] = [
    { field: "col1", headerName: "terrestrial_date", width: 150 },
    { field: "col2", headerName: "local_uv_irradiance_index", width: 150 },
    { field: "col3", headerName: "sunset", width: 150 },
    { field: "col4", headerName: "sunrise", width: 150 },
    { field: "col5", headerName: "pressure", width: 150 },
    { field: "col6", headerName: "min_temp", width: 150 },
    { field: "col7", headerName: "max_temp", width: 150 },
  ];
  const modifiedData =
    !isLoading &&
    data.soles.map((e: any) => {
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
    });
  const d =
    !isLoading &&
    data.soles.slice(0, amount).map((e: any) => {
      return {
        id: e.id,
        date: e.terrestrial_date,
        uv: e.local_uv_irradiance_index,
        sunset: e.sunset,
        sunrise: e.sunrise,
        pressure: e.pressure,
        min: e.min_temp,
        max: e.max_temp,
      };
    });
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
            <DataGrid rows={modifiedData} columns={columns} />
          </div>
        )}
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            alignItems: "start",
            p: 4,
          }}
        >
          <FormControl sx={{m:1}}>
            <InputLabel id="select-paramX">Select X</InputLabel>
            <Select
              labelId="select-paramX"
              value={paramX}
              label="X"
              onChange={(e: any) => {
                setParamX(e.target.value);
              }}
            >
              <MenuItem value={"min"}>min temp</MenuItem>
              <MenuItem value={"max"}>max temp</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{m:1}}>
            <InputLabel id="select-paramY">Select Y</InputLabel>
            <Select
              labelId="select-paramY"
              value={paramY}
              label="Y"
              onChange={(e: any) => {
                setParamY(e.target.value);
              }}
            >
              <MenuItem value={"min"}>min temp</MenuItem>
              <MenuItem value={"max"}>max temp</MenuItem>
            </Select>
          </FormControl>
          <FormControl sx={{m:1}}>
            <InputLabel id="select-amount">Amount</InputLabel>
            <Select
              labelId="select-amount"
              value={amount}
              label="Y"
              onChange={(e: any) => {
                setAmount(e.target.value);
              }}
            >
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={50}>50</MenuItem>
            </Select>
          </FormControl>
          <ScatterChart width={400} height={400} data={d}>
            <Scatter name="max" dataKey={paramX} fill="#8884d8" />
            <Scatter name="min" dataKey={paramY} fill="#82ca9d" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey={"date"} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </ScatterChart>

          <LineChart
            width={400}
            height={400}
            data={d}
            margin={{ top: 5, right: 20, bottom: 5, left: 0 }}
          >
            <Line type="monotone" dataKey={paramX} stroke="#8884d8" />
            <Line type="monotone" dataKey={paramY} stroke="#82ca9d" />
            <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
            <XAxis dataKey={"date"} />
            <YAxis />
            <Tooltip />
            <Legend verticalAlign="top" height={36} />
          </LineChart>
        </Box>
      </Box>
    </React.Fragment>
  );
};

export default MarsWeatherPage;
