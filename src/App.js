import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Header from "./components/header";
import Box from "@mui/material/Box";
import Accordion from "./components/accordian";
import Home from "./components/Home";
import AllCities from "./components/AllCities";

import CustomizedAccordions from "./components/customAccordian";
import BranchInfoAccordian from "./components/branchInfoAccordian";
import { AppContext } from "./context";
import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import AllBranches from "./components/AllBranches";
import AllStates from "./components/AllStates";
import GetCitiesFromStates from "./components/getCitiesFromStates";
import GetBranchesFromCity from "./components/getBranchesFromCity";
import BranchInfoPage from "./components/branchInfoAccordian";
export default function App() {
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
     
        <Router>
        {/* <Header /> */}
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/pages/all-cities" element={<AllCities />} />
            <Route path="/pages/all-branches" element={<AllBranches />} />
            <Route path="/pages/all-states" element={<AllStates />} />
            <Route path="/pages/get-cites-from-states/:stateName" element={<GetCitiesFromStates />} />
            <Route path="/pages/get-branches-from-city/:cityName" element={<GetBranchesFromCity />} />
            <Route path="/pages/get-branches-from-city/:cityName" element={<GetBranchesFromCity />} />
            <Route path="/pages/branch-details/:brnchName" element={<BranchInfoPage />} />
          </Routes>
        </Router>
      </Box>
    </Container>

    //
    //       <Header />

    //       <Accordion />
    //       <CustomizedAccordions />
    //       <BranchInfoAccordian />
    //
    //
  );
}
