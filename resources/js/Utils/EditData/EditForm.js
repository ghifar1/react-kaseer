import {Backdrop, Box, Button, Container, Divider, InputAdornment, Stack, TextField} from "@mui/material";
import {usePage} from "@inertiajs/inertia-react";
import {useState} from "react";

export default function EditForm({state, onClick, notify, form, setForm, refresh, setRefresh})
{
    const {base_url, user_id} = usePage().props


    function handleChange(e) {
        const key = e.target.id;
        const value = e.target.value
        setForm(form => ({
            ...form,
            [key]: value,
        }))
    }

    function handleSubmit()
    {
        console.log(form)
        fetch(`${base_url}/api/editBarang`,{
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(form)
        }).then((res) => res.json()).then((re) => console.log(re)).then(()=>{
            notify("Barang berhasil diedit")
            setRefresh(!refresh)
        });
    }

    return (
        <Backdrop open={state} sx={{ zIndex: 99}}>
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'white', height: '100%', borderRadius: 2, padding: 3}} >
                    <Box sx={{display: 'grid', gap: 1}} >
                        <TextField id="kode_barang" label="Kode Barang" value={form.kode_barang} onChange={handleChange} variant="filled" />
                        <TextField id="nama_barang" label="Nama Barang" value={form.nama_barang} onChange={handleChange} variant="filled" />
                        <TextField id="harga" label="Harga" variant="filled" type={"number"} value={form.harga} onChange={handleChange}
                                   InputProps={{
                                       startAdornment: <InputAdornment position="start">Rp.</InputAdornment>,
                                   }}/>
                        <TextField id="stok" label="Stok" variant="filled" value={form.stok} onChange={handleChange} type={"number"} />

                    </Box>
                    <Stack sx={{marginTop: 3}} direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                        <Button variant={"contained"} color={"success"} onClick={handleSubmit}>Simpan</Button>
                        <Button variant={"contained"} onClick={onClick}>Tutup</Button>
                    </Stack>
                </Box>
            </Container>
        </Backdrop>
    )
}
