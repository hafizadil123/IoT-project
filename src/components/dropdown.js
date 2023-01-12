import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AppContext } from '../context';
import {useNavigate} from 'react-router-dom'
export default function SelectVariants() {
  const [filter, setFilter] = React.useState('home');
  const navigate=useNavigate();

  const handleChange = (event) => {
    setFilter(event.target.value);
    if(event.target.value==='locations'){
      localStorage.setItem('filter', event.target.value)
      navigate('/pages/all-branches')

    }else if(event.target.value==='home'){
      localStorage.setItem('filter', event.target.value)
      navigate('/')
    }
    console.log('locations', event.target.value)
   

  };
 const filterV = localStorage.getItem('filter')
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select filter</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filterV || filter}
          onChange={handleChange}
          label=""
        >
          <MenuItem key={1} value={"home"}>Home</MenuItem>
          <MenuItem key={2} value={"locations"}>Locations</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}