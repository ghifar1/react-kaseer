import {usePage} from "@inertiajs/inertia-react";
import {
    Backdrop,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    InputAdornment,
    InputLabel, MenuItem, Select,
    Stack,
    TextField
} from "@mui/material";
import Typography from "@mui/material/Typography";
import {useState} from "react";

export function PrintItem({state, onClick})
{
    const {base_url} = usePage().props
    const [tipe, setTipe] = useState('');

    function handleChange(e)
    {
        setTipe(e.target.value)
    }

    function printItem()
    {
        window.open(`${base_url}/print/${tipe}`, "_blank")
    }

    return (
        <Backdrop open={state}
                  sx={{ zIndex: 99}}
        >
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'white', height: '100%', borderRadius: 2, padding: 3}} >
                    <Typography variant={"h5"} sx={{marginLeft: 2, marginRight: 2}}>
                        Print Barang
                    </Typography>
                    <Box sx={{ display: 'grid'}}>
                        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-standard-label">Tipe Print Kode</InputLabel>
                            <Select
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                                value={tipe}
                                onChange={handleChange}
                                label="Tipe print kode"
                            >
                                <MenuItem value="">
                                    <em>None</em>
                                </MenuItem>
                                <MenuItem value="qrcode">QR Code</MenuItem>
                                <MenuItem value="barcode">Bar code</MenuItem>
                                <MenuItem value="barbar">Thirty</MenuItem>
                            </Select>
                        </FormControl>
                        <Stack sx={{marginTop: 3}} direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                            <Button variant={"contained"} color={"success"} onClick={printItem}>Print</Button>
                            <Button variant={"contained"} onClick={onClick}>Tutup</Button>
                        </Stack>
                    </Box>
                </Box>

            </Container>
        </Backdrop>
    )
}
