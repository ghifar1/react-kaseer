import {Box, Divider, Skeleton, Stack, Typography} from "@mui/material";
import {usePage} from "@inertiajs/inertia-react";
import {useEffect, useState} from "react";
import {DataGrid} from "@mui/x-data-grid";

export function Riwayat()
{
    const {base_url} = usePage().props
    const [row, setRow] = useState([])
    const [total, setTotal] = useState(0)
    const columns = [
        { field: 'id', headerName: 'ID', width: 50 },
        { field: 'detail_barang', headerName: 'Barang', width: 250,
        renderCell: ({row})=>{
            let barangs = JSON.parse(row.detail_barang)
            let nama_barang = ""
            barangs.forEach((data)=>{
                nama_barang += ' ' + data.nama_barang + '[' + data.qty + ']' + ','
            })
            return nama_barang
        }},
        { field: 'total_harga', headerName: 'Total', width: 100,
        renderCell: ({row}) => {
            return formatter.format(row.total_harga)
        }},
        { field: 'tipe', headerName: 'Tipe', width: 100 }
    ];

    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'IDR',

        // These options are needed to round to whole numbers if that's what you want.
        //minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
        maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
    });

    useEffect(()=>{
        fetch(`${base_url}/api/getHistoryTransaction`).then((res) => res.json()).then((json)=>{
            setRow(row => (json))
        })

        fetch(`${base_url}/api/getDayTransaction`).then((res) => res.json()).then((json)=>{
            let tempTotal = 0
            json.forEach((data) => {
                tempTotal += data.total_harga
            })

            setTotal(tempTotal)
        })

        return;
    }, [])



    return (
        <Box sx={{ display: 'grid', padding: 2}}>
            <Box>
                <Typography variant={"body1"}>
                    Penghasilan hari ini
                </Typography>
                <Typography variant={"h4"}>
                    {formatter.format(total)}
                </Typography>
                <Divider sx={{marginTop: 1}}/>
            </Box>
             <Box sx={{ height: 600}}>
                 {row.length ? <DataGrid
                     columns={columns}
                     rows={row}
                     pageSize={10}
                 />: (
                     <Stack spacing={2}>
                         <Skeleton variant="rectangular" height={50} />
                         <Skeleton variant="rectangular" height={50} />
                         <Skeleton variant="rectangular" height={50} />
                         <Skeleton variant="rectangular" height={50} />
                         <Skeleton variant="rectangular" height={50} />
                         <Skeleton variant="rectangular" height={50} />
                     </Stack>
                 )}

             </Box>
        </Box>
    )
}
