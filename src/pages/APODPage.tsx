import {
  Box,
  CircularProgress,
  Divider,
  FormControlLabel,
  Switch,
  TextField,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import {
  useGetPictureQuery,
  useGetPicturesRangeQuery,
  useGetRecentPictureQuery,
} from "../services/apodApi";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";

import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs, { Dayjs } from "dayjs";
import { useTheme } from '@mui/material/styles';

interface IAPODPage {}

const APODPage: React.FunctionComponent<IAPODPage> = () => {
  const [value, setValue] = React.useState<string | null>(
    dayjs().add(-1, "day").format().slice(0, 10)
  );
  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));
  //const { data, error, isLoading } = useGetPictureQuery(value || new Date().toJSON().slice(0, 10));
  const {
    data: singlePicture,
    error: singlePictureErr,
    isLoading: singlePictureIsLoading,
  } = useGetPictureQuery(value!);
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('lg'));
  const {
    data: rangePic,
    error: rangePicErr,
    isLoading: rangePicIsLoading,
  } = useGetPicturesRangeQuery({ sd: startDate, ed: endDate });
  const [label, setLabel] = useState("Single Astronomy Picture");

  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue!.format().slice(0, 10));
  };
  console.log("start: ", startDate);
  console.log("end: ", endDate);
  console.log("loading: ", singlePictureIsLoading);
  console.log("data: ", rangePic);
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        margin: "2em 5em",
        boxSizing: "content-box",
      }}
    >
      <FormControlLabel
        control={<Switch defaultChecked />}
        onClick={() => {
          setLabel(
            label === "Multiple Astronomy Pictures"
              ? "Single Astronomy Picture"
              : "Multiple Astronomy Pictures"
          );
        }}
        label={label}
      />

      {label === "Single Astronomy Picture" ? (
        singlePictureIsLoading ? (
          <CircularProgress color="secondary" />
        ) : (
          <React.Fragment>
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
            <Card sx={{ display: "flex", mt: 3 }}>
              <Box sx={{ display: "flex", flexDirection: "column" }}>
                <CardContent sx={{ flex: "1 0 auto" }}>
                  <Typography sx={{ pb: 3 }} component="div" variant="h5">
                    {singlePicture.date}
                  </Typography>
                  <Typography
                    sx={{ pb: 2 }}
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {singlePicture.copyright}
                  </Typography>
                  <Divider />
                  <Typography variant="body1" gutterBottom>
                    {singlePicture.explanation}
                  </Typography>
                  <Divider />

                  {singlePictureErr && (
                    <Typography sx={{ pb: 3 }} component="div" variant="h5">
                      Provide Valid Date!
                    </Typography>
                  )}
                </CardContent>
              </Box>
              <CardMedia
                component="img"
                sx={{ maxWidth: "60%", height: "80vh" }}
                image={singlePicture.url}
                loading="lazy"
                alt="no img"
                onClick={() => {
                  window.open(
                    singlePicture.hdurl,
                    "_blank",
                    "noopener,noreferrer"
                  );
                }}
              />
            </Card>
          </React.Fragment>
        )
      ) : (
        <React.Fragment>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              label="Choose Starting Date"
              inputFormat="MM/DD/YYYY"
              value={startDate}
              maxDate={dayjs()}
              minDate={dayjs(new Date(1995, 6, 16))}
              onChange={(e: Dayjs | null) => {
                setStartDate(e!.format().slice(0, 10));
              }}
              renderInput={(params) => <TextField {...params} />}
            />

            <MobileDatePicker
              label="Choose Ending Date"
              inputFormat="MM/DD/YYYY"
              value={endDate}
              maxDate={dayjs()}
              minDate={dayjs(startDate)}
              onChange={(e: Dayjs | null) => {
                setEndDate(e!.format().slice(0, 10));
              }}
              renderInput={(params) => <TextField {...params} />}
            />
          </LocalizationProvider>
          <Box sx={{ flexBasis: "100%", height: "0" }}></Box>
          {rangePic.length===0 && (<Typography sx={{ pb: 3 }} component="div" variant="h5">
                    Select Date Range
                  </Typography>)}
          
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <ImageList
              sx={{ width: "auto", height: "80vh" }}
              cols={matchDownMd ? 1 : 3 }
              rowHeight={400}
              variant="quilted"
            >
              {rangePic.map((item: any) => (
                <ImageListItem key={item.date}>
                  <img
                    src={`${item.url}`}
                    srcSet={`${item.url}`}
                    alt={item.date}
                    loading="lazy"
                    onClick={() => {
                      window.open(item.hdurl, "_blank", "noopener,noreferrer");
                    }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
};

export default APODPage;
