import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';

import { AppContext } from '../context';
import axios from 'axios';
import constants from '../constants'
import ExpandMoreIcon from '@mui/icons-material/ArrowForwardIos';

export default function ControlledAccordions() {
    const [expanded, setExpanded] = React.useState(false);
    const { branchInfo, data, filter, search } = React.useContext(AppContext)
    const [typeData, setTypeData] = React.useState([]);
    const handleChange =
        (panel) => (event, isExpanded) => {
            setExpanded(isExpanded ? panel : false);
        };

    const formatUrl = (type, value) => {
        console.log('type', type)
        return `${constants.apiURL}/get-branchInfo?branch=${type}`
    }

    React.useEffect(() => {
        if (branchInfo) {
            axios.get(`${formatUrl(data)}`).then((res) => {
                setTypeData(res.data.result);
            })
        }

    }, [branchInfo])
    console.log('branchInfo', branchInfo, typeData)
    const { current, condition } = typeData || {}
    console.log({ typeData, condition })
    return (
        <div>
            {branchInfo &&
                <>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Ambient
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white'}}>
                            <div className='box_style_main'>
                                <Typography>
                                    Temperature (Inside/outside)
                                </Typography>
                                <Typography>
                                    20 / {current?.feelslike_c}
                                </Typography>
                            </div>
                            <div className='box_style_main'>
                                <Typography className="box_style_inner">
                                    Humidity (Inside/outside)
                                </Typography>
                                <Typography>
                                    20 / {current?.humidity}
                                </Typography>
                            </div>
                            <div className='box_style_main'>
                                <Typography className="box_style_inner">
                                    Lux (Inside/outside)
                                </Typography>
                                <Typography>
                                    20 /  {current?.condition?.text}
                                </Typography>
                            </div>
                            <div className='box_style_main'>
                                <Typography>
                                    Air Quality (Inside/outside)
                                </Typography>
                                <Typography>
                                    20 / {current?.air_quality?.pm2_5}
                                </Typography>
                            </div>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Electricity
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white', color: 'white' }}>
                            <Typography className='box_style'>
                                Live Energy (Inside/outside)  {'  '} <span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                Live Current (Inside/outside)  {'  '} <span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                Live Voltage (Inside/outside)  {'  '}<span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                Live Power Factor (Inside/outside)  {'  '}<span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                Live Frequency (Inside/outside)  {'  '} <span>89</span>
                            </Typography>

                        </AccordionDetails>
                    </Accordion>
                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                Monitors
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails style={{ backgroundColor: 'white', color: 'white' }}>
                            <Typography className='box_style'>
                                Air Neutralizer Level (Inside/outside)  {'  '} <span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                Hand-wash Level (Inside/outside)  {'  '} <span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                Garbage Monitor (Inside/outside)  {'  '} <span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                DG Set Service Due  (Inside/outside)  {'  '} <span>89</span>
                            </Typography>

                            <Typography className='box_style'>
                                AC Service Due (Inside/outside)  {'  '}<span>89</span>
                            </Typography>

                        </AccordionDetails>
                    </Accordion>

                </>
           }
        </div>
    );
}
