import {Box, Button, Card, CardContent, Divider, Paper} from "@mui/material";
import {Inertia} from "@inertiajs/inertia";
import NavBar from "../Utils/NavBar";
import Typography from "@mui/material/Typography";
import {AddItem} from "../Utils/Kasir/AddItem";
import {useState} from "react";
import {KasirIndex} from "../Utils/Kasir/KasirIndex";
import {Riwayat} from "../Utils/Kasir/Riwayat";
import BottomBar from "../Utils/BottomBar";
import * as React from "react";

function Home()
{
    const [bottomBar, setBottomBar] = React.useState('kasir');
    
    return (
        <div>
            <NavBar/>
            {bottomBar == 'kasir' ? <KasirIndex/>: <Riwayat />}
            <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
                <BottomBar state={bottomBar} setState={setBottomBar}/>
            </Paper>
        </div>
    )
}

export default Home
