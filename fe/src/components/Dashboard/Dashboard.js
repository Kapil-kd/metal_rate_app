import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import { Logoutfn } from "../../api/authService";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();

  const Logout = async () => {
    const token = localStorage.token;

    try {
      const res = await Logoutfn(token);

      if (res?.data?.code === 200) {
        toast.success(res?.data?.msg);
        localStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      toast.error(error?.response?.data?.msg);
    }
  };

  const Rate =()=>{
    navigate("rates")
  }
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Metal Rate Manager
          </Typography>

          <Box>
            <Button color="inherit" onClick={Rate}>
              Rate
            </Button>
            <Button color="inherit" onClick={Logout}>
              Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Outlet />
    </div>
  );
};

export default Dashboard;
