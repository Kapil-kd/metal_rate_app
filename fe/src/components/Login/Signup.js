import  { useEffect, useState } from 'react';
import { TextField, Button, Box} from '@mui/material';
import { signup, verifylogin } from '../../api/authService';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';


const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
 const navigate = useNavigate();

 useEffect(()=>{
   const Verifyfn = async()=>{
  const token = localStorage.token;
 if(token){
    const res = await verifylogin(token);
     if (res.data.msg === "success" && res.data.code === 200) {
          navigate("/dashboard")
        }
  }
   }
   Verifyfn();

 },[])

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await signup(form);      
      if(res?.data?.code === 200){
      toast.success(res?.data?.msg);      
        navigate("/login")
      }
    } catch (err) {
      toast.error(err.response?.data?.msg);      
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{maxWidth: 300, mx: 'auto', mt: 5 }}>
      <TextField
        label="Name"
        fullWidth
        margin="normal"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
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
      <Button type="submit" variant="contained" fullWidth>Sign Up</Button>
      <Button type='button' onClick={()=>navigate("/login")} variant="outlined" sx={{marginTop:"10px"}} fullWidth>Login</Button>

    </Box>
  );
};

export default Signup;
