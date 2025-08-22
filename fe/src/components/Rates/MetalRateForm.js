import React, { useState, useEffect } from "react";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  useTheme,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { METALS } from "../../utils/metals";
import { getPurities } from "../../api/purity";
import { getLatestRate, createRate } from "../../api/metalRate";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import BackBreadcrumb from "../Breadcrumbs/Breadcrumbs";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function MetalRateForm() {
  const [metal, setMetal] = useState("");
  const [purities, setPurities] = useState([]);
  const [purity, setPurity] = useState(null);
  const [latest, setLatest] = useState(null);
  const [rate, setRate] = useState("");
  const [rateDate, setRateDate] = useState(null);

  const token = localStorage.token;
  const navigate = useNavigate();

  const fetchPurities = async () => {
    try {
      const data = await getPurities(token);
      setPurities(data);
    } catch (error) {
      console.error("Failed to load purities:", error);
    }
  };
  useEffect(() => {
    fetchPurities();
  }, [token]);

  useEffect(() => {
    if (metal && purity) {
      getLatestRate(token, metal, purity._id).then(setLatest);
    } else setLatest(null);
  }, [metal, purity, token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!metal || !purity || !rate || !rateDate)
    return alert("Fill all fields");
   const res = await createRate(token, {
      metal,
      purityId: purity._id,
      rate: parseFloat(rate),
      rateDate,
    });
    
    setRate("");
    setRateDate(null);
    setMetal("");
    setPurity(null)
    setLatest(null)
    toast.success("Added")
  };

  const theme = useTheme();

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        mb: 3,
        display: "flex",
        flexDirection: "column",
        gap: 4,
        flexWrap: "wrap",
      }}
    >
      <Box display="flex" flexDirection="column">
        <BackBreadcrumb onBack={() => navigate('/dashboard')} />

        <Typography variant={theme.typography.h5} gutterBottom>
          Check Rate
        </Typography>
        <Box display="flex" sx={{ gap: 4,marginTop:"15px" }}>
          <Autocomplete
            options={METALS}
            value={metal}
            onChange={(e, v) => setMetal(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Metal"
                required
                
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

          <Autocomplete
            options={purities}
            getOptionLabel={(o) => `${o.metal} – ${o.name}`}
            value={purity}
            onChange={(e, v) => setPurity(v)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Purity"
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
        </Box>
      </Box>

    <Box sx={{ mb: 2, maxWidth: "30%" }}>
  {latest ? (
    <Paper
      elevation={2}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        minHeight: 56,       // Adjust height of the Paper container (optional)
      }}
    >
      <TrendingUpIcon color="primary" sx={{ fontSize: 28 }} />  {/* Larger icon */}
      <Typography
        sx={{ fontSize: '16px', lineHeight: 1.5 }}                // Custom font size & line height
        variant="body1"
      >
        Latest Rate: <strong>{latest.rate}</strong> on{" "}
        <em>{new Date(latest.rateDate).toLocaleDateString()}</em>
      </Typography>
    </Paper>
  ) : (
    <Paper
      elevation={1}
      sx={{
        p: 2,
        display: "flex",
        alignItems: "center",
        gap: 1,
        minHeight: 48,      
      }}
    >
      <InfoOutlinedIcon color="disabled" sx={{ fontSize: 24 }} />
      <Typography
        sx={{ fontSize: '14px', lineHeight: 1.4 }}
        variant="body2"
      >
        No previous rate found.
      </Typography>
    </Paper>
  )}
</Box>


      <Box>
        <Typography variant={theme.typography.h5} gutterBottom>
          Add New Rate
        </Typography>
        <Box display="flex" sx={{ gap: 4, marginTop: "15px" }}>
          <TextField
            label="New Rate"
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            required
            sx={{
              width: 120,
            }}
          />

          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="Rate Date"
              value={rateDate}
              onChange={(newVal) => setRateDate(newVal)}
              renderInput={(params) => <TextField  {...params} required />}
            />
          </LocalizationProvider>
        </Box>
      </Box>

      <Button variant="contained" sx={{ maxWidth: "15%" }} type="submit">
        Submit Rate
      </Button>
    </Box>
  );
}
