import * as React from 'react';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Header from './components/header';
import Box from '@mui/material/Box';
import Accordion from './components/accordian';
import CustomizedAccordions from './components/customAccordian'
import { AppContext } from './context';
export default function App() {
  const [data, setData] = React.useState({})

  const dispatchUserEvent = (actionType, payload) => {
		switch (actionType) {
			case 'LEVEL_1':
				setData(payload);
				return;
			case 'LEVEL_2':
				setData(payload);
				return;
			default:
				return;
		}
	};

  console.log('dataaaa', data)
  return (

    <AppContext.Provider value={{ data, dispatchUserEvent }}>
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
        <Header />

        <Accordion />
        <CustomizedAccordions />
      </Box>
    </Container>
    			</AppContext.Provider>

  );
}
