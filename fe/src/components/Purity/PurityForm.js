import React, { useState, useEffect } from "react";
import { TextField, Button, Autocomplete, Box } from "@mui/material";
import { METALS } from "../../utils/metals";

export default function PurityForm({ onSubmit, initial, token }) {

  const [metal, setMetal] = useState("");
  const [name, setName] = useState("");
  const [value, setValue] = useState("");


  useEffect(() => {
    if (initial) {
      setMetal(initial.metal || "");
      setName(initial.name || "");
      setValue(initial.value || "");
    }
  }, [initial]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!metal || !name || value <= 0) return alert("Please fill all fields");

    onSubmit({ metal, name, value: parseFloat(value) });
    setMetal("");
    setName("");
    setValue("");
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ mb: 2, mt: 2, p: 2, display: "flex", gap: 2, alignItems: "center" }}
    >
      <Autocomplete
        options={METALS}
        value={metal}
        onChange={(e, v) => setMetal(v)}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Metal"
            required
            InputProps={{
              ...params.InputProps,
              sx: {
                height: 40,
                fontSize: "14px",
                padding: "0 12px",
                boxSizing: "border-box",
              },
            }}
            InputLabelProps={{
              sx: {
                fontSize: "14px",
                top: "-4px",
              },
            }}
          />
        )}
        sx={{
          width: 150,
          "& .MuiInputBase-root": {
            height: 40,
            fontSize: "14px",
          },
        }}
      />

      <TextField
        label="Purity Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        InputProps={{
          sx: {
            height: 40,
            fontSize: "14px",
            padding: "0 12px",
            boxSizing: "border-box",
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: "14px",
            top: "-4px",
          },
        }}
        sx={{
          width: 200,
        }}
      />

      <TextField
        label="Value"
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        required
        InputProps={{
          sx: {
            height: 40,
            fontSize: "14px",
            padding: "0 12px",
            boxSizing: "border-box",
          },
        }}
        InputLabelProps={{
          sx: {
            fontSize: "14px",
            top: "-4px",
          },
        }}
        sx={{
          width: 150,
        }}
      />
      <Button variant="contained" type="submit" sx={{fontSize:"0.8rem"}}>
        Save
      </Button>
    </Box>
  );
}
