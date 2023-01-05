import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { AppContext } from '../context';
export default function SelectVariants() {
  const [filter, setFilter] = React.useState('');


  const handleChange = (event) => {
    setFilter(event.target.value);
    console.log('locations', event.target.value)

  };

  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">Select filter</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter}
          onChange={handleChange}
          label=""
        >
          <MenuItem value={"home"}>Home</MenuItem>
          <MenuItem value={"locations"}>Locations</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}