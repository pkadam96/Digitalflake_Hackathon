import React, { useState } from 'react';
import { Box, Button, IconButton, TextField } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import logo from '../assets/logo.png';
import login_bg from '../assets/login_bg.jpg';
import { useAuth } from '../contexts/AuthContext';
import { Dashboard } from './Dashboard';

const Login: React.FC = () => {
  const { login, isAuthenticated } = useAuth();
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({email: '',password: '',});
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(formData.email, formData.password);
    } 
    catch (error) {
      setError('Login failed. Please check your credentials.');     
    }
  };
  
  if (isAuthenticated) {
    return <Dashboard />;
  }

  return (
    <Box className='flex justify-center items-center h-screen relative'
      style={{
        backgroundImage: `url(${login_bg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <Box
        className='absolute inset-0 bg-white opacity-50'
        style={{ backdropFilter: 'blur(5px)' }}
      ></Box>
      <form id="loginform" className='w-1/3 m-auto p-10 bg-white z-20 shadow-custom rounded-lg'>
        <img src={logo} alt="Logo" className='w-48 m-auto' />
        <p className='text-center text-darkgray text-xl mb-14 font-font-poppins'>Welcome to Digitalflake Admin</p>
        <TextField
          label="Email"
          id="email"
          color="secondary"
          name="email"
          variant="outlined"
          value={formData.email}
          onChange={handleInputChange}
          fullWidth
          sx={{ fontFamily: "poppins" }}
        />

        <TextField
          label="Password"
          id="password"
          color="secondary"
          name="password"
          variant="outlined"
          value={formData.password}
          onChange={handleInputChange}
          type={showPassword ? 'text' : 'password'}
          fullWidth
          sx={{ marginTop: "40px", fontFamily: "poppins" }}
          InputProps={{
            endAdornment: (
              <IconButton
                aria-label="toggle password visibility"
                onClick={handleClickShowPassword}
                onMouseDown={handleMouseDownPassword}
                edge="end"
              >
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            )
          }}
        />

        <Button
          sx={{
            color: "gray",
            textTransform: "none",
            float: "right",
            fontWeight: 100,
            textDecoration: "none"
          }}
        >
          Forgot Password?
        </Button>
        <Button
          variant="contained"
          size="large"
          fullWidth
          sx={{
            backgroundColor: '#5C218B',
            marginTop: "60px",
            marginBottom: "10px",
            textTransform: 'none',
            fontSize: "20px",
            fontFamily: "Inter",
            '&:hover': {
              backgroundColor: '#7e0088',
            },
          }}
          onClick={handleLogin}
        >
          Log In
        </Button>
        <p className='text-center' style={{color:"red"}}>{error}</p>
      </form>
    </Box>
  );
};

export { Login };
