import {
    Backdrop,
    Box,
    Button,
    Container,
    Divider,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack
} from "@mui/material";
import Typography from "@mui/material/Typography";
import BarcodeScannerComponent from "react-qr-barcode-scanner";
import {useEffect, useState} from "react";
import {usePage} from "@inertiajs/inertia-react";
import {useCookies} from "react-cookie";

export function CodeScan({state, onClick, notify, notifyError})
{
    const {base_url} = usePage().props
    const [cookies, setCookie] = useCookies(['cart'])
    const [data, setData] = useState("null");

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

    useEffect(()=>{
        if(data !== "null")
        {
            fetch(`${base_url}/api/cariBarang`, {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    nama_barang: data
                })

            }).then((res) => res.json()).then((json) => {
                if(json[0])
                {
                    addCart(json[0])
                } else {
                    notifyError("Barang tidak ditemukan!")
                }
            })

        }
    }, [data])


    return (
        <Backdrop open={state}
                  sx={{ zIndex: 99}}
        >
            <Container maxWidth="sm">
                <Box sx={{ bgcolor: 'white', height: '100%', borderRadius: 2, padding: 3}} >
                    <Typography variant={"h5"} sx={{marginLeft: 2, marginRight: 2}}>
                        Scan Barcode
                    </Typography>
                    <Box sx={{ display: 'grid'}}>
                        <BarcodeScannerComponent
                            delay={1000}
                            onUpdate={(err, result) => {
                                if (result) setData(result.text);
                                else setData("null");
                            }}
                        />
                        {data}
                    </Box>
                    <Stack sx={{marginTop: 3}} direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                        <Button variant={"contained"} onClick={onClick}>Tutup</Button>
                    </Stack>
                </Box>

            </Container>
        </Backdrop>
    )
}
