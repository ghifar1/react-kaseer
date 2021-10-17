import React, {useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {Box, Button, TextField} from "@mui/material";
import {usePage} from "@inertiajs/inertia-react";
import {Inertia} from "@inertiajs/inertia";
import {useCookies} from "react-cookie";



function Login()
{
    const {csrf, errors, base_url} = usePage().props
    const [values, setValues] = useState({
        _token: csrf,
        email: "",
        password: "",
    })

    const [cookies, setCookie] = useCookies(['cart'])

    useEffect(()=>{
        let cart = cookies.cart;
        console.log(cart)
        if(!cart)
        {
            setCookie('cart', JSON.stringify([]));
        }
        return;
    }, [])

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    function handleSubmit(e)
    {
        e.preventDefault();
        Inertia.post(`${base_url}/login`, values)
    }

    return (
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
            <div>
                <Box sx={{ fontSize: 40, textAlign: 'center', marginBottom: 2}}>
                    Masuk
                </Box>
                <form onSubmit={handleSubmit}>
                    <Box sx={{ display: 'grid', gap: 3}}>
                        <TextField id="email" value={values.email} onChange={handleChange} error={errors.email ? true : false} helperText={errors.email} label="Email" type="email" variant="outlined" />
                        <TextField id="password" value={values.password} onChange={handleChange} error={errors.password ? true : false} helperText={errors.password} label="Password" type="password" variant="outlined" />
                    </Box>
                    <Box>
                        <Button sx={{marginTop: 2}} type="submit" variant="contained">Submit</Button>
                    </Box>
                </form>

            </div>
        </Box>
    )
}

export default Login
