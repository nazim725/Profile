import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { NavLink } from 'react-router-dom';

export default function Navigation() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Profiles
                    </Typography>
                    <NavLink style={{textDecoration:'none',color:'#fff',marginRight:'10px'}} to='/createProfile'> Create Profile</NavLink>
                    <NavLink style={{textDecoration:'none',color:'#fff',marginRight:'10px'}} to='/showProfile'>All Profile</NavLink>
                    <NavLink style={{textDecoration:'none',color:'#fff',marginRight:'10px'}} to='/pausedProfile'>Paused Profile</NavLink>
                   
                </Toolbar>
            </AppBar>
        </Box>
    );
}
