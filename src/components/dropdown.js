import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { AppContext } from "../context";
import { useNavigate } from "react-router-dom";
export default function SelectVariants() {
  const [filter, setFilter] = React.useState("home");
  const navigate = useNavigate();
  React.useEffect(() => {
    const uri = window.location.href;
    const splittedURI = uri.split("/");
    // if(splittedURI.includes('all-branches') || splittedURI.includes('all-states') || splittedURI.includes('all-cities') || splittedURI.includes('get-cites-from-states') || splittedURI.includes('get-branches-from-city') || splittedURI.includes('branch-details')){
    //   console.log('yes its location filter')
    // }
    if (splittedURI.includes("all-branches")) {
      console.log("yes its location filter");
      setFilter("locations");
    } else if (
      splittedURI.includes("all-states") ||
      splittedURI.includes("all-cities") ||
      splittedURI.includes("get-cites-from-states") ||
      splittedURI.includes("get-branches-from-city") ||
      splittedURI.includes("branch-details")
    ) {
      console.log("yes its location filter");
      setFilter("locations");

    }
  }, []);
  const handleChange = (event) => {
    setFilter(event.target.value);
    if (event.target.value === "locations") {
      navigate("/pages/all-branches");
    } else if (event.target.value === "home") {
      navigate("/");
    }
    console.log("locations", event.target.value);
  };
  const filterV = localStorage.getItem("filter");
  console.log({ filterV });
  return (
    <div>
      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label"></InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={filter}
          onChange={handleChange}
          label=""
        >
          <MenuItem key={1} value={""}></MenuItem>
          <MenuItem key={1} value={"home"}>
            Home
          </MenuItem>
          <MenuItem key={2} value={"locations"}>
            Locations
          </MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
