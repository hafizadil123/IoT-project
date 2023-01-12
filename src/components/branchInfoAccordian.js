import * as React from "react";
import Accordion from "@mui/material/Accordion";
import { styled } from "@mui/material/styles";
import MuiAccordionDetails from "@mui/material/AccordionDetails";

import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";

import { AppContext } from "../context";
import axios from "axios";
import constants from "../constants";
import { useParams } from "react-router-dom";
import PrimarySearchAppBar from "./header";
import ExpandMoreIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";



export default function BranchInfoPage() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [typeData, setTypeData] = React.useState([]);
  const [temprature,setTemprature]=React.useState('');
  const [humidity,setHumidity]=React.useState('');
  const [electrity,setElectricity]=React.useState(null)
  const [lux,setLux]=React.useState('');
  const [aq,setAq]=React.useState('');
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
  const branchInfo = "";
  const { brnchName } = useParams();

  const formatUrl = (type, value) => {
    console.log("type", type);
    return `${constants.apiURL}/get-branchInfo?branch=${type}`;
  };

  React.useEffect(() => {
    axios.get(`${formatUrl(brnchName)}`).then((res) => {
      setTypeData(res.data.result);
      setHumidity(res.data.humidity)
      setTemprature(res.data.temprature)
      setElectricity(res.data.electricity);
      setLux(res.data.lux);
      setAq(res.data.AQ);
    });
  }, [branchInfo]);
  console.log("branchInfo", branchInfo, typeData);
  const { current, condition } = typeData || {};
  console.log({ typeData, condition });
  const AccordionSummary = styled((props) => (
    <MuiAccordionSummary
      expandIcon={<ArrowForwardIosIcon sx={{ fontSize: "0.9rem" }} />}
      {...props}
    />
  ))(({ theme }) => ({
    backgroundColor:
      theme.palette.mode === "dark"
        ? "rgba(255, 255, 255, .05)"
        : "rgba(0, 0, 0, .03)",
    flexDirection: "row-reverse",
    "& .MuiAccordionSummary-expandIconWrapper.Mui-expanded": {
      transform: "rotate(90deg)",
    },
    "& .MuiAccordionSummary-content": {
      marginLeft: theme.spacing(1),
    },
  }));
  const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
    padding: theme.spacing(2),
    borderTop: "1px solid rgba(0, 0, 0, .125)",
  }));

  return (
    <div>
      <PrimarySearchAppBar />
      {brnchName && (
        <>
          <Accordion
            expanded={expanded === "panel1"}
            onChange={handleChange("panel1")}
          >
            <AccordionSummary
              expandIcon={<ArrowForwardIosIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Ambient
              </Typography>
            </AccordionSummary>
            <AccordionDetails style={{ backgroundColor: "white" }}>
              <div className="box_style_main">
                <Typography>Temperature (Inside/outside)</Typography>
                <Typography> {temprature && temprature?.toFixed(1)} &#8451; / {current?.feelslike_c} &#8451; </Typography>
              </div>
              <div className="box_style_main">
                <Typography className="box_style_inner">
                  Humidity (Inside/outside)
                </Typography>
                <Typography>{humidity} %  / {current?.humidity} %</Typography>
              </div>
              <div className="box_style_main">
                <Typography className="box_style_inner">
                  Lux (Inside/outside)
                </Typography>
                <Typography>{lux} / {current?.condition?.text}</Typography>
              </div>
              <div className="box_style_main">
                <Typography>Air Quality (Inside/outside)</Typography>
                <Typography>{aq} / {current?.air_quality?.pm2_5?.toFixed(2)}</Typography>
              </div>
            </AccordionDetails>
          </Accordion>
          {
            electrity !==null ?
            <>
            {console.log({electrity})}
            <Accordion
            expanded={expanded === "panel2"}
            onChange={handleChange("panel2")}
          >
            <AccordionSummary
              expandIcon={<ArrowForwardIosIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Electricity
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "white", color: "white" }}
            >
              <Typography className="box_style">
                Live Energy  {"  "} <span>{electrity?.energy?.toFixed(2)} W</span>
              </Typography>

              <Typography className="box_style">
                Live Current  {"  "} <span>{electrity?.current?.toFixed(2)} A</span>
              </Typography>

              <Typography className="box_style">
                Live Voltage  {"  "}
                <span>{electrity?.voltage?.toFixed(2)} V</span>
              </Typography>

              <Typography className="box_style">
                Live Power Factor  {"  "}
                <span>{electrity?.power_factor?.toFixed(2)}</span>
              </Typography>

              <Typography className="box_style">
                Live Frequency  {"  "} <span>{electrity?.frequency?.toFixed(2)}</span>
              </Typography>
            </AccordionDetails>
          </Accordion>
            </>:null
          }
          
          <Accordion
            expanded={expanded === "panel3"}
            onChange={handleChange("panel3")}
          >
            <AccordionSummary
              expandIcon={<ArrowForwardIosIcon />}
              aria-controls="panel1bh-content"
              id="panel1bh-header"
            >
              <Typography sx={{ width: "33%", flexShrink: 0 }}>
                Monitors
              </Typography>
            </AccordionSummary>
            <AccordionDetails
              style={{ backgroundColor: "white", color: "white" }}
            >
              <Typography className="box_style">
                Air Neutralizer Level (Inside/outside) {"  "} <span>89</span>
              </Typography>

              <Typography className="box_style">
                Hand-wash Level (Inside/outside) {"  "} <span>89</span>
              </Typography>

              <Typography className="box_style">
                Garbage Monitor (Inside/outside) {"  "} <span>89</span>
              </Typography>

              <Typography className="box_style">
                DG Set Service Due (Inside/outside) {"  "} <span>89</span>
              </Typography>

              <Typography className="box_style">
                AC Service Due (Inside/outside) {"  "}
                <span>89</span>
              </Typography>
            </AccordionDetails>
          </Accordion>
        </>
      )}
    </div>
  );
}
