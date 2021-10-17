import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import {Inertia} from "@inertiajs/inertia";
import Drawer from "./Drawer";
import BottomBar from "./BottomBar";
import {useState} from "react";
import {Paper} from "@mui/material";

function NavBar()
{
    const [drawer, setDrawer] = useState(false);

    function drawerSwitch()
    {
        setDrawer(drawer => !drawer);
    }


    function logout(e)
    {
        e.preventDefault()
        Inertia.post('/logout');
    }

    return (
        <Box sx={{ flexGrow: 1}}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton onClick={drawerSwitch}
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon/>
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Kaseer
                    </Typography>
                    <Button color="inherit" onClick={logout}>Keluar</Button>
                </Toolbar>
            </AppBar>
            <Drawer state={drawer} onClose={drawerSwitch} onOpen={drawerSwitch}/>

        </Box>
    )
}

export default NavBar
