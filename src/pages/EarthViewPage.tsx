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

interface IEarthViewPage {}

const EarthViewPage: React.FunctionComponent<IEarthViewPage> = () => {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const [startDate, setStartDate] = useState(new Date().toJSON().slice(0, 10));
  const [endDate, setEndDate] = useState(new Date().toJSON().slice(0, 10));
  const [picType, setPicType] = useState("natural");
  const { data, error, isLoading, isFetching } = useGetInfoQuery({
    picType: "natural",
    date: "2022-12-31",
  });
  console.log(data);
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step: number) => {
    setActiveStep(step);
  };

  return (
    <Box
      sx={{ width:'100%', height:'80vh',flexGrow: 1 }}
    >
      {!isLoading && !isFetching && data ? (
        <Fragment>
          <Paper
            square
            elevation={0}
            sx={{
              display: "flex",
              alignItems: "center",
              height: 50,
              pl: 2,
              bgcolor: "background.default",
            }}
          ></Paper>
          <SwipeableViews
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
            
          >
            {!isLoading && !isFetching && data
              ? data.map((el: any, index: any) => (
                  <div key={el.image}>
                    {Math.abs(activeStep - index) <= 2 ? (
                      <Box
                        component="img"
                        sx={{
                          height: "auto",
                          display: "block",
                          maxWidth: "100%",
                          overflow: "hidden",
                          width: "100%",
                        }}
                        src={`https://epic.gsfc.nasa.gov/archive/${'natural'}/${
                          el.date.split("-")[0]
                        }/${el.date.split("-")[1]}/${el.date
                          .split("-")[2]
                          .slice(0, 2)}/png/${el.image}.png`}
                        alt={el.image}
                      />
                    ) : null}
                  </div>
                ))
              : null}
          </SwipeableViews>
          <MobileStepper
            steps={data.length}
            position="static"
            activeStep={activeStep}
            nextButton={
              <Button
                size="small"
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
                size="small"
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
