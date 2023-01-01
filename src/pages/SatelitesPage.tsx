import { Box } from "@mui/material";
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
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

L.Marker.prototype.options.icon = DefaultIcon;
interface ISatelitesPage {}

const SatelitesPage: React.FunctionComponent<ISatelitesPage> = () => {
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));
  const [satRoutes, setSatRoutes] = useState<any>([]);
  const { data, error, isLoading, isFetching } = useGetCollectionQuery({
    ps: 10,
    sort: "popularity",
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
      <MapContainer
        center={[51.505, -0.09]}
        zoom={4}
        scrollWheelZoom={true}
        style={{ width: "100vw", height: "93vh" }}
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
                <Marker
                  position={[ el[2].lat, el[2].lng]}
                >
                  <Popup>{el[0]}</Popup>
                </Marker>
              </Fragment>
            );
          })}
        </SVGOverlay>
      </MapContainer>
    </React.Fragment>
  );
};

export default SatelitesPage;
