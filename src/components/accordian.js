import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AppContext } from '../context';

export default function SimpleAccordion() {
    const { dispatchUserEvent, data } = React.useContext(AppContext);

    const names = ['States & UTs', 'Cities', 'Branches'];
    const mainData = {
        states: 1,
        cities: 2,
        branches: 4
    }


    return (
        <div>
            {Object.keys(data).length === 0 && Object.keys(mainData).map((item, index) => (<Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
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
