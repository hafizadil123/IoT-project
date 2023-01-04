import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './components/header';
import Box from '@mui/material/Box';
import Accordion from './components/accordian';
import CustomizedAccordions from './components/customAccordian'
import BranchInfoAccordian from './components/branchInfoAccordian'
import { AppContext } from './context';

export default function App() {
  const [data, setData] = React.useState({})
  const [branchInfo, setBranchInfo] = React.useState(false);
  const [filter, setFilter] = React.useState('');
  const [search, setSearch] = React.useState('');
  const dispatchUserEvent = (actionType, payload) => {
		switch (actionType) {
			case 'LEVEL_1':
				setData(payload);
        setBranchInfo(false)
				return;
			case 'LEVEL_2':
				setData(payload);
        setBranchInfo(true)
				return;
      case 'Filter':
        setFilter(payload)
      case 'Search':
        setSearch(payload)
			default:
				return;
		}
	};

  console.log('dataaaa', data)
  return (

    <AppContext.Provider value={{ data, dispatchUserEvent, branchInfo, filter, search }}>
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Header />
        
        <Accordion />
        <CustomizedAccordions />
        <BranchInfoAccordian />
      </Box>
    </Container>
    			</AppContext.Provider>

  );
}
