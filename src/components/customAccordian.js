import * as React from 'react';
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { AppContext } from '../context';
import axios from 'axios';
import constants from '../constants'
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  '&:not(:last-child)': {
    borderBottom: 0,
  },
  '&:before': {
    display: 'none',
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => ({
  backgroundColor:
    theme.palette.mode === 'dark'
      ? 'rgba(255, 255, 255, .05)'
      : 'rgba(0, 0, 0, .03)',
  flexDirection: 'row-reverse',
  '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
    transform: 'rotate(90deg)',
  },
  '& .MuiAccordionSummary-content': {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: '1px solid rgba(0, 0, 0, .125)',
}));

const formatUrl = (type, value) => {
  if(type === 'states') {
    return `${constants.apiURL}/get-states`
  } else if(type === 'cities') {
    return `${constants.apiURL}/get-cities`
  } else if(type === 'branches') {
    return `${constants.apiURL}/get-branches`
  }
}
export default function CustomizedAccordions() {
  const [expanded, setExpanded] = React.useState('panel1');
  const [typeData, setTypeData] = React.useState([]);
  
  
  const { data } = React.useContext(AppContext);
  console.log('dtaaa', data);
  React.useEffect(() => {
    axios.get(`${formatUrl(data)}`).then((res) => {
    setTypeData(res.data.result);
    })
  }, [data])

  console.log('acccc', data);
  const handleChange =
    (panel) => (event, newExpanded) => {
      setExpanded(newExpanded ? panel : false);
    };

  return (
    <div>
      {Object.keys(data).length > 0 && 
         <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
         <AccordionSummary aria-controls="panel1d-content" id="panel1d-header">
           <Typography>{data}</Typography>
         </AccordionSummary>
         {Object.keys(data).length > 0 && typeData &&  typeData.length > 0 && typeData.map((item, index) => 
             <AccordionDetails>
                <Typography onClick={() => dispatchUserEvent('LEVEL_1', item)}>
                  {item}
                </Typography>
                </AccordionDetails>
)}
       </Accordion>
}
    </div>
       
)
}
