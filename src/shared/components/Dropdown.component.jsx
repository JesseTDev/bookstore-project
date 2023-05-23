import React from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

const Dropdown = ({
  label,
  selectedGenre,
  handleGenreSelectChange,
  GENRE_ARRAY,
  name,
  defaultValue,
}) => {
  return (
    <Box sx={{ minWidth: 120, maxWidth: 300, marginBottom: "16px" }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">{label}</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          name={name}
          value={selectedGenre || defaultValue || ''}
          label={label}
          onChange={handleGenreSelectChange}
        >
          {GENRE_ARRAY.map((option) => {
            return <MenuItem key={Math.random() * 200000} value={option.value}>{option.name}</MenuItem>;
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Dropdown;
