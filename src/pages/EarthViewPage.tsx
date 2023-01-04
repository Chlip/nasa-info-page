import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import React, { useState, useEffect, Fragment } from "react";

import CircularProgress from "@mui/material/CircularProgress";
import { useGetInfoQuery } from "../services/epicApi";
import dayjs, { Dayjs } from "dayjs";
import { FormControlLabel, Switch, TextField } from "@mui/material";
import { LocalizationProvider, MobileDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

interface IEarthViewPage {}

const EarthViewPage: React.FunctionComponent<IEarthViewPage> = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const [pickDate, setPickDate] = React.useState<string | null>(
    dayjs().add(-1, "day").format().slice(0, 10)
  );
  const [picType, setPicType] = useState("enhanced");

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };
  const handleChange = (newpickDate: Dayjs | null) => {
    setPickDate(newpickDate!.format().slice(0, 10));
  };
  const { data, currentData, error, isLoading, isFetching } = useGetInfoQuery({
    picType: picType,
    date: pickDate!,
  });
  console.log(pickDate);
  console.log(isLoading);
  console.log(isFetching);
  console.log(data);
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          my: 5,
          width: "40%",
          mx: "auto",
        }}
      >
        <LocalizationProvider sx={{ mt: 5 }} dateAdapter={AdapterDayjs}>
          <MobileDatePicker
            label="Choose Date"
            inputFormat="MM/DD/YYYY"
            maxDate={dayjs()}
            value={pickDate}
            onChange={handleChange}
            renderInput={(params) => <TextField {...params} />}
            minDate={dayjs(new Date(2015, 10, 31))}
          />
        </LocalizationProvider>
        <FormControlLabel
        control={<Switch defaultChecked />}
        onClick={() => {
          setPicType(
            picType === "natural"
              ? "enhanced"
              : "natural"
          );
        }}
        label={picType}
      />
      </Box>
      {!isLoading && !isFetching && data.length===0 ? (
        <Typography sx={{ textAlign: "center" }}>
          No pictures for this day
        </Typography>
        
      ) : !isLoading && !isFetching ? (
        <Fragment>
          <Typography sx={{ textAlign: "center" }}>
            {data[activeStep].date}
          </Typography>
          <Typography sx={{ textAlign: "center" }}>
            {data[activeStep].caption}
          </Typography>
          <Box
            component="img"
            sx={{
              maxHeight: "60vh",
              display: "block",
              maxWidth: "50%",
              overflow: "hidden",
              width: "auto",
              margin: "auto",
            }}
            src={`https://epic.gsfc.nasa.gov/archive/${picType}/${
              data[activeStep].date.split("-")[0]
            }/${data[activeStep].date.split("-")[1]}/${data[activeStep].date
              .split("-")[2]
              .slice(0, 2)}/png/${data[activeStep].image}.png`}
            alt={data[activeStep].image}
            
          />
          <MobileStepper
            variant="text"
            steps={data.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="large"
                onClick={handleNext}
                disabled={activeStep === data.length - 1}
              >
                Next
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="large"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
                Back
              </Button>
            }
          />
        </Fragment>
      ) : (
        ""
      )}
      
    </Box>
  );
};

export default EarthViewPage;
