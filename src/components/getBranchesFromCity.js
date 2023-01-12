import * as React from "react";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion, { AccordionProps } from "@mui/material/Accordion";
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { AppContext } from "../context";
import axios from "axios";
import constants from "../constants";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import {useParams,Link} from 'react-router-dom';
import PrimarySearchAppBar from "./header";
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
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

const formatUrl = (activeCity) => {
  return `${constants.apiURL}/get-branch-from-city?city=${activeCity}`;
};
export default function GetBranchesFromCity() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [typeData, setTypeData] = React.useState([]);
  const [activeCity,setActiveCity]=React.useState('')
  const [actualData,setActualData]=React.useState([]);

  const { cityName } = useParams();
  React.useEffect(() => {
    setActiveCity(cityName)
    axios.get(`${formatUrl(cityName)}`).then((res) => {
        console.log({res})
      setTypeData(res.data.branches);
      setActualData(res.data.branches);

    });
  }, []);
  const handleSearch = (value)=>{
    console.log('valueeee',value)
    if(value==''){
      setTypeData(actualData);
    }else{
      let searchData=actualData.filter(item=>{
        if (item.indexOf(value) > -1) {
          return item
        }
      })
      setTypeData(searchData);
    }
  }
  return (
    <div>
      <PrimarySearchAppBar handleSearch={handleSearch} />
      <Accordion>
        <AccordionSummary
          expandIcon={<ArrowForwardIosIcon />}
          aria-controls="panel1d-content"
          id="panel1d-header"
          style={{ fontSize: "16px" }}
        >
          <Typography>{`Branches in ${activeCity}`}</Typography>
        </AccordionSummary>
        {typeData.map((item, index) => (
          <AccordionDetails key={index} style={{ backgroundColor: "white" }}>
            {/* <Typography className="box_style">{item}</Typography> */}
            <Link to={`/pages/branch-details/${item}`} style={{textDecoration:'none',color:"white"}}><Typography className="box_style">{item}</Typography></Link>

          </AccordionDetails>
        ))}
      </Accordion>
    </div>
  );
}
