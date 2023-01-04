import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React, { Fragment, useEffect, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
  Tooltip,
} from "react-leaflet";
import CircularProgress from "@mui/material/CircularProgress";
import { useGetCollectionQuery } from "../services/tleApi";
import { getGroundTracks, getLatLngObj } from "tle.js";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
interface ISatelitesPage {}
const columns: GridColDef[] = [
  { field: "satelliteId", headerName: "satelliteId", width: 150 },
  { field: "name", headerName: "name", width: 150 },
  { field: "line1", headerName: "line1", width: 600 },
  { field: "line2", headerName: "line2", width: 600 },
  { field: "date", headerName: "date", width: 250 },
];
const SatelitesPage: React.FunctionComponent<ISatelitesPage> = () => {
  const [numberOfSat, setNumberOfSat] = useState(10);
  const [sortSatBy, setSortSatBy] = useState("popularity");
  const [satRoutes, setSatRoutes] = useState<any>([]);
  const { data, error, isLoading, isFetching } = useGetCollectionQuery({
    ps: numberOfSat,
    sort: sortSatBy,
  });
  console.log(data);
  const sat =
    !isLoading &&
    data.member.map(
      (el: any) => `${el.name}
  ${el.line1}
  ${el.line2}`
    );
  //console.log(sat);
  //   const latLonObj = !isLoading && !isFetching && getLatLngObj(sat[0]);
  //   console.log(latLonObj)
  useEffect(() => {
    setSatRoutes([]);
    !isLoading &&
      !isFetching &&
      sat.length != 0 &&
      sat.forEach((s: any) => {
        try {
          getGroundTracks({
            tle: s,
            startTimeMS: Date.now(),
            stepMS: 1000,
            isLngLatFormat: false,
          }).then((res: any) => {
            if (res[1]) {
              setSatRoutes((prev: any) => [
                ...prev,
                [s.split("\n")[0], [res[1]], getLatLngObj(s, Date.now())],
              ]);
            }
          });
        } catch {
          console.log("err");
        }
      });
  }, [isLoading, isFetching]);

  console.log(satRoutes);
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
        <FormControl sx={{ m: 1, minWidth: "150px" }}>
          <InputLabel id="select-numberOfSat">Number of Satelites</InputLabel>
          <Select
            labelId="select-numberOfSat"
            value={numberOfSat}
            label="Number of Satelites"
            onChange={(e: any) => {
              setNumberOfSat(e.target.value);
            }}
          >
            <MenuItem value={5}>5</MenuItem>
            <MenuItem value={10}>10</MenuItem>
            <MenuItem value={20}>20</MenuItem>
            <MenuItem value={40}>40</MenuItem>
            <MenuItem value={100}>100</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: "150px" }}>
          <InputLabel id="select-sortSatBy">Select Satelite Sort</InputLabel>
          <Select
            labelId="select-sortSatBy"
            value={sortSatBy}
            label="select-sat-sort"
            onChange={(e: any) => {
              setSortSatBy(e.target.value);
            }}
          >
            <MenuItem value={"period"}>period</MenuItem>
            <MenuItem value={"popularity"}>popularity</MenuItem>
            <MenuItem value={"inclination"}>inclination</MenuItem>
            <MenuItem value={"eccentricity"}>eccentricity</MenuItem>
            <MenuItem value={"name"}>name</MenuItem>
            <MenuItem value={"id"}>id</MenuItem>
          </Select>
        </FormControl>
        <MapContainer
          center={[51.505, -0.09]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ width: "90vw", height: "80vh" }}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <SVGOverlay
            attributes={{ stroke: "red" }}
            bounds={[
              [9999, 99999],
              [99999, 99999],
            ]}
          >
            {satRoutes.map((el: any) => {
              let col = "#" + Math.floor(Math.random() * 16777215).toString(16);
              return (
                <Fragment key={el[0]}>
                  <Polyline
                    pathOptions={{
                      color: col,
                    }}
                    positions={el[1]}
                  >
                    <Tooltip sticky>{el[0]}</Tooltip>
                  </Polyline>
                  <Marker position={[el[2].lat, el[2].lng]}>
                    <Popup>{el[0]}</Popup>
                  </Marker>
                </Fragment>
              );
            })}
          </SVGOverlay>
        </MapContainer>
        {isLoading ? (
          <CircularProgress/>
        ) : (
          <div style={{ height: 700, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.satelliteId}
              rows={data.member}
              columns={columns}
            />
          </div>
        )}
      </Box>
    </React.Fragment>
  );
};

export default SatelitesPage;
