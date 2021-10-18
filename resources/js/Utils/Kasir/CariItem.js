import {usePage} from "@inertiajs/inertia-react";
import {Backdrop, Box, Button, Container, Divider, InputAdornment, Stack, TextField} from "@mui/material";
import Typography from "@mui/material/Typography";
import { DataGrid } from '@mui/x-data-grid';
import {useEffect, useState} from "react";
import {useCookies} from "react-cookie";


export function CariItem({state, setState, notify})
{
    const {base_url} = usePage().props
    const [cookies, setCookie] = useCookies(['cart'])
    const [rows, setRows] = useState([])

    const [form, setForm] = useState({
        nama_barang: ""
    })

    const ItemColumns = [
        {
            field: 'nama_barang', headerName: 'Nama', width: 100
        },
        {
            field: 'harga', headerName: 'Harga', width: 80
        },
        {
            field: 'stok', headerName: 'Jumlah', width: 80
        },
        {
            field: 'id', headerName: 'Aksi', width: 100,
            renderCell: (params) =>{
                return (<Button variant={"contained"} onClick={()=>addCart(params.row)}>Tambah</Button>)
            }
        }
    ]

    useEffect(()=>{
        fetch(`${base_url}/api/getBarang`).then((res) => res.json()).then((json) => {
            setRows(json);
        })

        let cart = cookies.cart;
        if(!cart)
        {
            setCookie('cart', JSON.stringify([]))
        }

        return;

    }, [])

    useEffect(()=>{
        fetch(`${base_url}/api/cariBarang`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)

        }).then((res) => res.json()).then((json) => {
            setRows(json);
        })
    }, [form.nama_barang])

    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    function handleClick()
    {
        setState(!state)
    }



    function addCart(row)
    {
        let cart = cookies.cart;
        let found = false;
        cart.find((item, index) => {
            if(item.id === row.id)
            {
                if(item['qty'])
                {
                    cart[index]['qty']++;
                } else {
                    cart[index]['qty'] = 1;
                }

                found = true;
            }
        })

        if(!found)
        {
            row['qty'] = 1;
            cart.push(row);
        }

        console.log(cart)
        setCookie('cart', JSON.stringify(cart))
        notify("Barang berhasil ditambah")
    }


    return (
        <Backdrop open={state} sx={{ zIndex: 99}}>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'white', height: '100%', borderRadius: 2, padding: 3}} >
                    <Typography variant={"h5"} sx={{marginLeft: 2, marginRight: 2}}>
                        Cari Barang
                    </Typography>
                    <Box sx={{ display: 'grid' }}>
                        <TextField id="nama_barang" label={"kode / nama barang"} variant={"filled"} onChange={handleChange}/>
                        <Box sx={{height: 300}}>
                            {rows.length != 0 ? (<DataGrid columns={ItemColumns} rows={rows}></DataGrid>): ''}
                        </Box>
                    </Box>
                    <Stack sx={{marginTop: 3}} direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                        <Button variant={"contained"} onClick={handleClick}>Tutup</Button>
                    </Stack>
                </Box>

            </Container>
        </Backdrop>
    )
}
