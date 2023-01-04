import {
  Box,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import React, { Fragment, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  Marker,
  Polyline,
  Popup,
  SVGOverlay,
  TileLayer,
  useMap,
  Tooltip,
  WMSTileLayer,
} from "react-leaflet";

import CircularProgress from "@mui/material/CircularProgress";
import { DataGrid, GridRowsProp, GridColDef } from "@mui/x-data-grid";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import {
  useGetEventsDaysQuery,
  useGetEventsLimitQuery,
  useGetSourcesQuery,
} from "../services/eonetApi";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
interface IEarthWeatherEvents {}
const columns: GridColDef[] = [
  { field: "id", headerName: "eventId", width: 300 },
  { field: "title", headerName: "title", width: 300 },
  { field: "description", headerName: "description", width: 300 },
 
];
const EarthWeatherEvents: React.FunctionComponent<IEarthWeatherEvents> = () => {
  const [numberOfEvents, setNumberOfEvents] = useState(10);
  const [value, setValue] = useState<string | null>(
    dayjs().format().slice(0, 10)
  );
  const [days, setDays] = useState(2);
  const [label, setLabel] = useState("Get Number Of Events");
  const { data, currentData, isLoading, isFetching } =
    useGetEventsLimitQuery(numberOfEvents);
  const {
    data: dataDays,
    currentData: currentDataDays,
    isLoading: isLoadingDays,
    isFetching: isFetchingDays,
  } = useGetEventsDaysQuery(days);
  const {
    data: sources,
    isLoading: sourceIsLoading,
    isFetching: sourceIsFetching,
  } = useGetSourcesQuery("");
  
  console.log(dataDays);
  console.log('days: ', days)
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue!.format().slice(0, 10));
    const date1 = new Date(value!);
    const date2 = new Date();
    console.log(date2)
    console.log(date1)
    console.log('date diff : ',  Math.ceil(Math.abs(Number(date2.getTime()) - Number(date1.getTime()))/ (1000 * 60 * 60 * 24)))
    
  };
  useEffect(() => {
    
    setDays((prev:any)=>(Math.ceil(Math.abs(Number(new Date().getTime()) - Number(new Date(value!).getTime()))/ (1000 * 60 * 60 * 24))-1));
  
   
  }, [value])
  
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
        <FormControlLabel
          control={<Switch defaultChecked />}
          onClick={() => {
            setLabel(
              label === "Get Number Of Events"
                ? "Get All Events From Date"
                : "Get Number Of Events"
            );
          }}
          label={label}
        />
        {label === "Get Number Of Events" ? (
          <FormControl sx={{ m: 1, minWidth: "150px" }}>
            <InputLabel id="select-numberOfEvents">Number of Events</InputLabel>
            <Select
              labelId="select-numberOfEvents"
              value={numberOfEvents}
              label="Number of Events"
              onChange={(e: any) => {
                setNumberOfEvents(e.target.value);
              }}
            >
              <MenuItem value={5}>5</MenuItem>
              <MenuItem value={10}>10</MenuItem>
              <MenuItem value={20}>20</MenuItem>
              <MenuItem value={40}>40</MenuItem>
              <MenuItem value={100}>100</MenuItem>
            </Select>
          </FormControl>
        ) : (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Choose Date"
              inputFormat="MM/DD/YYYY"
              maxDate={dayjs()}
              minDate={dayjs(new Date(1995, 6, 16))}
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
        )}
        <MapContainer
          center={[51.505, -0.09]}
          zoom={4}
          scrollWheelZoom={true}
          style={{ width: "100vw", height: "80vh" }}
        >
          <WMSTileLayer
            layers={"TOPO-WMS,OSM-Overlay-WMS"}
            url={`http://ows.mundialis.de/services/service?`}
          />
          <SVGOverlay
            attributes={{ stroke: "red" }}
            bounds={[
              [9999, 99999],
              [9999, 9999],
            ]}
          >
            {!isLoading && !isFetching && data.length !== 0 && label==="Get Number Of Events"
              ? data.events.map((e: any) => {
                  return (
                    <Marker
                      position={[
                        e.geometries[e.geometries.length - 1].coordinates[1],
                        e.geometries[e.geometries.length - 1].coordinates[0],
                      ]}
                      key={e.id}
                    >
                      <Popup>
                        {e.title}
                        <br />
                        {e.geometries[e.geometries.length - 1].date}
                        <br />
                        {e.sources.map((el: any) => {
                          return (
                            <p key={el.id}>
                              <a href={el.url} target="_blank">
                                {!sourceIsLoading && !sourceIsFetching
                                  ? sources.sources.filter(
                                      (source: any) => source.id === el.id
                                    )[0].title
                                  : ""}
                              </a>
                              <br />
                            </p>
                          );
                        })}
                      </Popup>
                    </Marker>
                  );
                })
              : ""}
              {!isLoadingDays && !isFetchingDays && dataDays.length !== 0 && label==="Get All Events From Date"
              ? dataDays.events.map((e: any) => {
                  return (
                    <Marker
                      position={[
                        e.geometries[e.geometries.length - 1].coordinates[1],
                        e.geometries[e.geometries.length - 1].coordinates[0],
                      ]}
                      key={e.id}
                    >
                      <Popup>
                        {e.title}
                        <br />
                        {e.geometries[e.geometries.length - 1].date}
                        <br />
                        {e.sources.map((el: any) => {
                          return (
                            <p key={el.id}>
                              <a href={el.url} target="_blank">
                                {!sourceIsLoading && !sourceIsFetching
                                  ? sources.sources.filter(
                                      (source: any) => source.id === el.id
                                    )[0].title
                                  : ""}
                              </a>
                              <br />
                            </p>
                          );
                        })}
                      </Popup>
                    </Marker>
                  );
                })
              : ""}
          </SVGOverlay>
        </MapContainer>
        {isLoading ? (
          <CircularProgress/>
        ) : (
          <div style={{ height: 500, width: "100%" }}>
            <DataGrid
              getRowId={(row) => row.id}
              rows={label==="Get All Events From Date"?dataDays.events:data.events}
              columns={columns}
            />
          </div>
        )}
      </Box>
    </React.Fragment>
  );
};

export default EarthWeatherEvents;
