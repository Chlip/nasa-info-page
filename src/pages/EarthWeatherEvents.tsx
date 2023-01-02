import { Box, Typography } from "@mui/material";
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

import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import {
  useGetEventsLimitQuery,
  useGetSourcesQuery,
} from "../services/eonetApi";
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
interface IEarthWeatherEvents {}

const EarthWeatherEvents: React.FunctionComponent<IEarthWeatherEvents> = () => {
  const { data, currentData, error, isLoading, isFetching } =
    useGetEventsLimitQuery(5);
  const {
    data: sources,
    isLoading: sourceIsLoading,
    isFetching: sourceIsFetching,
  } = useGetSourcesQuery("");
  console.log(data);
  console.log(sources);
  return (
    <React.Fragment>
      <MapContainer
        center={[51.505, -0.09]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ width: "100vw", height: "93vh" }}
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
          {!isLoading && !isFetching && data.length !== 0
            ? data.events.map((e: any) => {
                return (
                  <Marker
                    position={[
                      e.geometries[0].coordinates[1],
                      e.geometries[0].coordinates[0],
                    ]}
                    key={e.id}
                  >
                    <Popup>
                      {e.title}
                      <br />
                      {e.geometries[0].date}
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
    </React.Fragment>
  );
};

export default EarthWeatherEvents;
