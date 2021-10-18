import * as React from "react";
import {Box, Button, Typography} from "@mui/material";
import {useEffect, useState} from "react";
import {usePage} from "@inertiajs/inertia-react";
import {DataGrid} from "@mui/x-data-grid";
import EditForm from "./EditForm";
import {toast, ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

export default function EditItem()
{
    const [rows, setRows] = useState([])
    const [editForm, setEditForm] = useState(false)
    const {base_url, user_id} = usePage().props
    const [form, setForm] = useState({
        nama_barang: ""
    })
    const [refresh, setRefresh] = useState(false);

    const [updateForm, setUpdateForm] = useState({
        kode_barang: "",
        nama_barang: "",
        harga: 0,
        stok: 0,
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
            renderCell: ({row}) =>{
                return (<Button variant={"contained"} onClick={()=>editFormChange(row)}>Edit</Button>)
            }
        }
    ]

    useEffect(()=>{
        fetch(`${base_url}/api/getBarang`).then((res) => res.json()).then((json) => {
            setRows(json);
        })
        return;

    }, [refresh])

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

    function editFormChange(data)
    {
        setUpdateForm(data)
        setEditForm(!editForm);
    }

    function notify(msg)
    {
        toast.success(msg)
    }

    return (
        <Box sx={{ display: "grid", padding: 2, gap: 2}}>
            <Typography variant={"h4"}>
                Edit data barang
            </Typography>
            <Box sx={{height: 500}}>
                {rows.length != 0 ? (<DataGrid columns={ItemColumns} rows={rows} pageSize={10}
                                               rowsPerPageOptions={[10]} ></DataGrid>): ''}
            </Box>
            <EditForm state={editForm} notify={notify} onClick={editFormChange} form={updateForm} setForm={setUpdateForm} refresh={refresh} setRefresh={setRefresh}/>
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
        </Box>
    )
}
