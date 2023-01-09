import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ArrowForwardIos";
import { AppContext } from "../context";
import axios from "axios";
import constants from "../constants";
import "./style.css";
import {Link} from 'react-router-dom';
import PrimarySearchAppBar from "./header";
export default function HomePage() {
  const [expanded, setExpanded] = React.useState("panel1");
  const [apiData, setApiData] = React.useState({});
  const [actualData,setActualData]=React.useState([]);
  const [typeData, setTypeData] = React.useState([]);
  const names = ["States & UTs", "Cities", "Branches"];


  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  React.useEffect(() => {
    axios.get(`${constants.apiURL}/get-stats`).then((res) => {
      setApiData(res.data);
      setActualData(res.data?.statsCount?.branchCount?.location)
    });
  }, []);

  const mainData = {
    states: apiData?.statsCount?.stateCount?.count,
    cities: apiData?.statsCount?.cityCount?.count,
    branches: apiData?.statsCount?.branchCount?.count,
  };
  const getRoute = (item) =>{
    if(item=="states"){
        return 'all-states';
    }
    if(item=="cities"){
        return 'all-cities';
    }
    if(item=="branches"){
        return 'all-branches';
    }
  }
  const handleSearch = (value)=>{
    console.log('valueeee',value)
    if(value==''){
      setTypeData([]);
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
        {Object.keys(mainData).map((item, index) => (
          <Accordion key={index}>
            <AccordionSummary
          
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
              style={{
                borderBottom: "3px solid midnightblue",
                marginTop: "16px",
              }}
            >
              <Typography>{names[index]}</Typography>
            </AccordionSummary>

            <AccordionDetails>
              <Typography>
               <Link to={`/pages/${getRoute(item)}`} style={{color:'black',textDecoration:'none',fontWeight:'bold'}}>  {!Array.isArray(mainData[item]) && mainData[item]}</Link>
              </Typography>
            </AccordionDetails>
          </Accordion>
        
        ))}
        {
          typeData.length > 0?
          <>
          <Typography>{`Searched Branches`}</Typography>
          {typeData.map((item, index) => (
            <AccordionDetails key={index} style={{ backgroundColor: "white" }}>
              {/* <Typography className="box_style">{item}</Typography> */}
              <Link to={`/pages/branch-details/${item}`} style={{textDecoration:'none',color:"white"}}><Typography className="box_style">{item}</Typography></Link>
  
            </AccordionDetails>
          ))}
          
          </>
          :null
        }
    </div>
  );
}
