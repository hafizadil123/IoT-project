import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ArrowForwardIos';
import { AppContext } from '../context';
import axios from 'axios';
import constants from '../constants'
import './style.css'


export default function SimpleAccordion() {
    const { dispatchUserEvent, data, branchInfo, filter } = React.useContext(AppContext);
    const [expanded, setExpanded] = React.useState('panel1');
    const [apiData, setApiData] = React.useState({})
    const names = ['States & UTs', 'Cities', 'Branches'];
    
    const handleChange =
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

    React.useEffect(() => {
        axios.get(`${constants.apiURL}/get-stats`).then((res) =>{
            setApiData(res.data);
        })
    }, [filter]);

    const mainData = {
        states: apiData?.statsCount?.stateCount?.count,
        cities: apiData?.statsCount?.cityCount?.count,
        branches: apiData?.statsCount?.branchCount?.count
    }
    
    return (
        <div>
            {Object.keys(data).length === 0 && Object.keys(mainData).map((item, index) => (<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    style={{borderBottom: '3px solid midnightblue', marginTop: '16px'}}
                    // expanded={expanded === `panel1`} onChange={handleChange(`panel1`)}
                    
                >
                    <Typography>{names[index]}</Typography>
                </AccordionSummary>
                
                <AccordionDetails>
                <Typography onClick={() => dispatchUserEvent('LEVEL_1', item)}>
                  {!Array.isArray(mainData[item]) && mainData[item]}
                </Typography>
                </AccordionDetails>
        
            </Accordion>))}
        </div>
    );
}
