import React, { useState,useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
} from "@mui/material";

const TempConverter = () => {
  const [temp, setTemp] = useState("");
  const [unit, setUnit] = useState("Celsius");
  const [contemp, setConTemp] = useState("");
  useEffect(() => {
    if (temp === "") {
      setConTemp("");
      return;
    }

    const tempValue = parseFloat(temp);
    if (isNaN(tempValue)) {
      setConTemp("Invalid Input");
      return;
    }

    if (unit === "Celsius") {
      // Convert Celsius to Fahrenheit
      setConTemp(((tempValue * 9) / 5 + 32).toFixed(2) + " °F");
    } else {
      // Convert Fahrenheit to Celsius
      setConTemp((((tempValue - 32) * 5) / 9).toFixed(2) + " °C");
    }
  }, [temp, unit]);

  return (
    <div>
      <span>
        <TextField id="filled-basic" label="Temperature" variant="filled" onChange={(e)=> setTemp(e.target.value)} />
      </span>
      <span>  </span>
      <span>
        <FormControl style={{ width: "12%" }}>
          <InputLabel id="demo-simple-select-label">Age</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={unit}
            label="Age"
            onChange={(e) => {
              setUnit(e.target.value);
            }}
          >
            <MenuItem value={"Celsius"}>Celsius</MenuItem>
            <MenuItem value={"Fahrenheit"}>Fahrenheit</MenuItem>
          </Select>
        </FormControl>
      </span>
      <div>Converted Temperature: </div>
      <div>
        {contemp}
      </div>
    </div>
  );
};

export default TempConverter;
