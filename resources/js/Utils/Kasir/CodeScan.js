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

export function CodeScan({state, onClick})
{
    const [data, setData] = useState("not found");

    useEffect(()=>{
        console.log(data)
    }, [data])
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
                        <BarcodeScannerComponent
                            width={500}
                            height={500}
                            onUpdate={(err, result) => {
                                if (result) setData(result.text);
                                else setData("Not Found");
                            }}
                        />
                    </Box>
                    <Stack sx={{marginTop: 3}} direction={"row"} spacing={1} divider={<Divider orientation="vertical" flexItem />}>
                        <Button variant={"contained"} onClick={onClick}>Tutup</Button>
                    </Stack>
                </Box>

            </Container>
        </Backdrop>
    )
}
