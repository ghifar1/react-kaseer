import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import {Box, Divider, ListItem, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from '@mui/icons-material/MoveToInbox';
import PrintIcon from '@mui/icons-material/Print';
import {useState} from "react";
import {AddItem} from "./Kasir/AddItem";
import {PrintItem} from "./Kasir/PrintItem";
import {Link, usePage} from "@inertiajs/inertia-react";

function Drawer({state, onOpen, onClose})
{
    const [addItem, setAddItem] = useState(false);
    const [print, setPrint] = useState(false);
    const {base_url} = usePage().props

    function openAddItem()
    {
        setAddItem(addItem => !addItem);
    }

    function openPrint()
    {
        setPrint(print => !print);
    }

    const list = (anchor) => (
        <Box
            sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={onOpen}
            onKeyDown={onOpen}
        >
            <List>
                <Link href={`${base_url}/home`}>
                    <ListItem button key={"kasir"}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText  primary={"Kasir"}/>
                    </ListItem>
                </Link>
                <Link href={`${base_url}/editData`}>
                    <ListItem button key={"edit_data"}>
                        <ListItemIcon>
                            <InboxIcon />
                        </ListItemIcon>
                        <ListItemText  primary={"Edit Data"}/>
                    </ListItem>
                </Link>
                <Divider />
                <ListItem onClick={openAddItem} button key={"barang"}>
                    <ListItemIcon>
                        <InboxIcon />
                    </ListItemIcon>
                    <ListItemText  primary={"Tambah Barang"}/>
                </ListItem>
                <ListItem onClick={openPrint} button key={"print"}>
                    <ListItemIcon>
                        <PrintIcon />
                    </ListItemIcon>
                    <ListItemText  primary={"Print Barang"}/>
                </ListItem>
            </List>
        </Box>
    );

    return (
        <div>
            <SwipeableDrawer
                anchor="left"
                open={state}
                onClose={onOpen}
                onOpen={onClose}
            >
                {list('left')}
            </SwipeableDrawer>
            <AddItem state={addItem} onClick={openAddItem}/>
            <PrintItem state={print} onClick={openPrint}/>
        </div>

    )
}

export default Drawer
