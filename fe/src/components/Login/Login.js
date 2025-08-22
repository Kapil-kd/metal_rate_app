import { useEffect, useState } from "react";
import { TextField, Button, Box } from "@mui/material";
import { login, verifylogin } from "../../api/authService";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const Verifyfn = async () => {
      const token = localStorage.token;
      if (token) {
        const res = await verifylogin(token);
        if (res.data.msg === "success" && res.data.code === 200) {
          navigate("/dashboard");
        }
      }
    };
    Verifyfn();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(form);
      localStorage.setItem("token", res?.data?.token);
      if (localStorage.token) {
        toast.success(res?.data?.msg);
        navigate("/purities");
      }
    } catch (err) {
        toast.error("Login failed: " + err.response?.data?.msg);
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{ maxWidth: 300, mx: "auto", mt: 5 }}
    >
      <TextField
        label="Email"
        fullWidth
        margin="normal"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <TextField
        label="Password"
        type="password"
        fullWidth
        margin="normal"
        value={form.password}
        onChange={(e) => setForm({ ...form, password: e.target.value })}
      />
      <Button type="submit" variant="contained" fullWidth>
        Login
      </Button>
      <Button
        type="button"
        onClick={() => navigate("/signup")}
        variant="outlined"
        sx={{ marginTop: "10px" }}
        fullWidth
      >
        Signup
      </Button>
    </Box>
  );
};

export default Login;
