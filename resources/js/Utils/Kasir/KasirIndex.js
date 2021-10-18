import {Box, Button, Card, CardContent, Divider, Grid, IconButton, Modal, Stack} from "@mui/material";
import Typography from "@mui/material/Typography";
import {AddItem} from "./AddItem";
import {useEffect, useState} from "react";
import {usePage} from "@inertiajs/inertia-react";
import {CariItem} from "./CariItem";
import {useCookies} from "react-cookie";
import AddIcon from '@mui/icons-material/Add';
import RemoveOutlinedIcon from '@mui/icons-material/RemoveOutlined';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {CodeScan} from "./CodeScan";

export function KasirIndex()
{
    const {base_url, user_id} = usePage().props
    const [cari , setCari] = useState(false);
    const [scan , setScan] = useState(false);
    const [cookies, setCookie] = useCookies(['cart'])
    const [total, setTotal] = useState(0);
    const [confirmModal, setConfirmModal] = useState(false)

    useEffect(()=>{
        let cart = cookies.cart;
        let temptotal = 0;
        cart.map((item) => {
            temptotal += item.qty * item.harga
        })
        setTotal(total => temptotal)
        return;
    }, [cookies.cart])

    function incrementQty(id)
    {
        let cart = cookies.cart;
        cart.find((item, index) => {
            if(item.id === id)
            {
                cart[index]['qty']++;
            }
        })
        setCookie('cart', JSON.stringify(cart))
    }

    function decrementQty(id)
    {
        let cart = cookies.cart;
        cart.find((item, index) => {
            if(item.id === id && item.qty !== 0)
            {
                cart[index]['qty']--;
            }

            if(item.id === id && item.qty === 0)
            {
                cart.splice(index, 1);
            }
        })
        setCookie('cart', JSON.stringify(cart))
    }

    function saveTransaction()
    {
        fetch(`${base_url}/api/createTransaction`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                detail_barang: cookies.cart,
                total_harga: total,
                created_by: user_id
            })
        }).then((res) => res.json()).then((json) => console.log(json))
        setConfirmModal(!confirmModal)
        notify("Transaksi berhasil disimpan.")
        setCookie('cart', JSON.stringify([]))
    }

    function scanChange()
    {
        setScan(scan => !scan);
    }

    function confirmModalChange()
    {
        setConfirmModal(confirmModal => !confirmModal);
    }

    function notify(msg)
    {
        toast.success(msg)
    }

    function notifyError(msg)
    {
        toast.error(msg)
    }

    return (
        <div>
            <Box sx={{ display: 'grid', margin: 1,
                gap: 1,
                gridTemplateColumns: 'repeat(2, 1fr)',
            }}>
                <Button variant="contained" color={"secondary"} onClick={() => setScan(!scan)}>Scan barcode</Button>
                <Button variant="contained" onClick={() => setCari(!cari)}>Cari barang</Button>
            </Box>
            <Box sx={{ display: 'grid', margin: 2}}>
                <Card sx={{width: '100%'}} variant={"outlined"}>
                    <CardContent>
                        <Typography variant={"h4"} component={"div"} sx={{marginBottom: 1}}>
                            List Barang
                        </Typography>
                        <Divider />
                        <Stack spacing={1}>
                            {cookies.cart.map((item)=>{
                                return (
                                    <Card key={item.id}>
                                        <CardContent>
                                            <Grid container>
                                                <Grid item xs={6}>
                                                    <Typography variant={"h6"}>
                                                        {item.nama_barang}
                                                    </Typography>
                                                </Grid>
                                                <Grid item xs={6}>
                                                    <Box display={"grid"}>
                                                        <Typography variant={"subtitle1"} sx={{ textAlign: "right"}}>
                                                            Rp. {item.harga} x {item.qty}
                                                        </Typography>
                                                        <Box sx={{ display: 'flex', justifyContent: 'right', gap: 1}}>
                                                            <IconButton onClick={() => decrementQty(item.id)}>
                                                                <RemoveOutlinedIcon />
                                                            </IconButton>
                                                            <IconButton onClick={() => incrementQty(item.id)}>
                                                                <AddIcon />
                                                            </IconButton>
                                                        </Box>
                                                    </Box>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                )
                            })}
                        </Stack>
                        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', marginTop: 1 }}>
                            <div>
                                {cookies.cart.length != 0 ? <Button variant={"outlined"} onClick={confirmModalChange}>
                                    Proses
                                </Button> : ''}
                            </div>
                            <Typography variant={"h6"} sx={{ textAlign: 'right'}}>
                                Total: Rp. {total}
                            </Typography>
                        </Box>
                    </CardContent>
                </Card>
            </Box>
            <CariItem state={cari} setState={setCari} notify={notify}/>
            {scan ? <CodeScan state={scan} onClick={scanChange} notify={notify} notifyError={notifyError}/> : ''}
            <ToastContainer
                position="top-left"
                autoClose={1500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover/>
            <Modal open={confirmModal}
            onClose={confirmModalChange}>
                <Box style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>
                    <Box style={{ background: 'white', borderRadius: 10, padding: 10}}>
                        <Typography variant={"h6"}>
                            Anda yakin ingin simpan?
                        </Typography>
                        <Box style={{display: 'flex', justifyContent: 'center', gap: 5}}>
                            <Button variant={"outlined"} color={"success"} onClick={saveTransaction}>Simpan</Button>
                            <Button onClick={confirmModalChange}>Tidak</Button>
                        </Box>
                    </Box>
                </Box>
            </Modal>
        </div>
    )
}
