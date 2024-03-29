import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import APODPage from "./pages/APODPage";
import MarsWeatherPage from "./pages/MarsWeatherPage";
import MarsRoverPage from "./pages/MarsRoverPage";
import SingleRoverPage from "./pages/SingleRoverPage";
import AsteroidsPage from "./pages/AsteroidsPage";
import SatelitesPage from "./pages/SatelitesPage";
import EarthViewPage from "./pages/EarthViewPage";
import EarthWeatherEvents from "./pages/EarthWeatherEvents";


const theme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#1F1B1B",
      dark: "#002884",
      contrastText: "#fff",
    },
    
  },
});

interface IApplicationProps {}
const Application: React.FunctionComponent<IApplicationProps> = () => {
  return (
    <React.Fragment>
      <ThemeProvider theme={theme}>
        
        <BrowserRouter>
        <Navbar />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/apod" element={<APODPage />} />
            <Route path="/marsweather" element={<MarsWeatherPage />} />
            <Route path="/marsrover" element={<MarsRoverPage />} />
            <Route path="/marsrover/:roverName" element={<SingleRoverPage />} />
            <Route path="/asteroids" element={<AsteroidsPage />} />
            <Route path="/satelites" element={<SatelitesPage />} />
            <Route path="/earthview" element={<EarthViewPage />} />
            <Route path="/earthweather" element={<EarthWeatherEvents />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Application;
