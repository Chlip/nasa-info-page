import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import AboutPage from "./pages/About";
import HomePage from "./pages/Home";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/system";
import APODPage from "./pages/APODPage";


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
            <Route path="about" element={<AboutPage />} />
            <Route path="apod" element={<APODPage />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </React.Fragment>
  );
};

export default Application;