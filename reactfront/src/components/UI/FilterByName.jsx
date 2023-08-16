import React, {useState} from "react";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import { Box } from "@mui/material";

export const FilterByName = (props) => {
  const setQueryHandler= (value) => {
    props.setQuery(value)
  }
  return (
    <Box
        sx={{
          display: "flex",
          alignItems: "flex-end",
          width: props.width,
          margin: "0 auto",
          marginTop: "1em",
        }}
      >
      <SearchIcon sx={{ color: "action.active", mr: 1, my: 0.5 }} />
      <TextField
        fullWidth
        id="input-with-sx"
        label="Search by name"
        variant="standard"
        onChange={(e) => setQueryHandler(e.target.value)}
      />
    </Box>
  );
};
