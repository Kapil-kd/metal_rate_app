import React, { useState, useEffect } from "react";
import { METALS } from "../../utils/metals";
import { getPurities } from "../../api/purity";
import { listRates } from "../../api/metalRate";
import {
  Autocomplete,
  TextField,
  Button,
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Pagination,
  CircularProgress
} from "@mui/material";

export default function MetalRateList() {
  const [purities, setPurities] = useState([]);
  const [metalFilter, setMetalFilter] = useState("");
  const [purityFilter, setPurityFilter] = useState(null);
  const [ratesData, setRatesData] = useState({
    rates: [],
    total: 0,
    page: 1,
    limit: 10,
  });
  const [loading, setLoading] = useState(false);

  const token = localStorage.token;


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

  
  const loadRates = () => {
      setLoading(true);
  listRates(token, {
    metal: metalFilter,
    purityId: purityFilter?._id,
    page: ratesData.page,
    limit: ratesData.limit,
  })
    .then((data) => setRatesData(data))
    .finally(() => setLoading(false));
  };
  useEffect(() => {
    loadRates();
  }, [metalFilter, purityFilter, ratesData.page, token]);
  
  const handlePageChange = (e, p) =>
    setRatesData((prev) => ({ ...prev, page: p }));

  return (
    <Box>
      <Box sx={{ display: "flex", gap: 2, alignItems: "center", mb: 2 }}>
        <Autocomplete
          options={METALS}
          value={metalFilter}
          onChange={(e, v) => setMetalFilter(v || "")}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Metal"
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
        <Autocomplete
          options={purities}
          getOptionLabel={(o) => `${o.metal} – ${o.name}`}
          value={purityFilter}
          onChange={(e, v) => setPurityFilter(v)}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Purity"
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
            width: 200,
            "& .MuiInputBase-root": {
              height: 40,
              fontSize: "14px",
            },
          }}
        />

        <Button
          variant="contained"
          onClick={() => {
            setRatesData((prev) => ({ ...prev, page: 1 }));
            loadRates();
          }}
        >
          Filter
        </Button>
      </Box>
      <Table stickyHeader>
        <TableHead  >
          <TableRow>
            <TableCell>Metal</TableCell>
            <TableCell>Purity</TableCell>
            <TableCell>Rate</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
  {loading ? (
    <TableRow>
      <TableCell colSpan={4} align="center">
        <CircularProgress size={24} />
      </TableCell>
    </TableRow>
  ) : ratesData?.rates?.length ? (
    ratesData.rates.map((data, index) => (
      <TableRow key={index}>
        <TableCell>{data?.metal}</TableCell>
        <TableCell>{data?.purity?.name}</TableCell>
        <TableCell>{data?.rate}</TableCell>
        <TableCell>
          {new Date(data?.rateDate).toLocaleDateString()}
        </TableCell>
      </TableRow>
    ))
  ) : (
    <TableRow>
      <TableCell colSpan={4} align="center">
        No data found.
      </TableCell>
    </TableRow>
  )}
</TableBody>

      </Table>
      <Pagination
        count={Math.ceil(ratesData.total / ratesData.limit)}
        page={ratesData.page}
        onChange={handlePageChange}
        sx={{ mt: 2 }}
      />
    </Box>
  );
}
