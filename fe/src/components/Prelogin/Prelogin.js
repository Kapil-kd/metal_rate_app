import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Button, Typography, Paper, Stack } from "@mui/material";

export const Prelogin = () => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      sx={{ backgroundColor: "#f5f5f5" }}
    >
      <Paper
        elevation={3}
        sx={{ p: 5, borderRadius: 3, textAlign: "center", width: 300 }}
      >
        <Typography variant="h5" gutterBottom>
          Welcome to Metal Rate App
        </Typography>

        <Typography variant="body2" sx={{ mb: 3 }}>
          Please Login or Signup to continue
        </Typography>

        <Stack spacing={2}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/login")}
            fullWidth
          >
            Login
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={() => navigate("/signup")}
            fullWidth
          >
            Sign Up
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default Prelogin;
