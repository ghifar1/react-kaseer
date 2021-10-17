import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import FolderIcon from '@mui/icons-material/Folder';
import RestoreIcon from '@mui/icons-material/Restore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LocationOnIcon from '@mui/icons-material/LocationOn';

export default function BottomBar({state, setState}) {
    const handleChange = (event, newValue) => {
        setState(newValue);
    };

    return (
        <BottomNavigation sx={{ width: 500 }} value={state} onChange={handleChange}>
            <BottomNavigationAction
                label="Kasir"
                value="kasir"
                icon={<RestoreIcon />}
            />
            <BottomNavigationAction
                label="Riwayat"
                value="riwayat"
                icon={<RestoreIcon />}
            />
        </BottomNavigation>
    );
}
