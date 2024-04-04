import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import transparentLogo from '../assets/transparentLogo.png';
import { useAuth } from '../contexts/AuthContext'; // Import the useAuth hook
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

const Navbar = () => {
  const { logout } = useAuth(); // Get the logout function from the context
  const navigate = useNavigate(); // Get the navigate function for navigation

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout(); // Call the logout function from the context
    navigate('/login'); // Navigate to the login page after logout
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ padding: 1, bgcolor: "#662671" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img src={transparentLogo} alt="" className='w-52' />
          </Typography>
          
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <i className="fa-regular fa-circle-user fa-xl"></i>
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                sx={{ top: "50px" }}
                open={Boolean(anchorEl)}
                onClose={handleClose} 
              >
                <MenuItem onClick={handleLogout} sx={{ color: "#B13129", fontWeight: 600, fontSize: "20px" }}>Log Out</MenuItem>
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export { Navbar }
