import * as React from 'react';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import RestoreIcon from '@mui/icons-material/Restore';
import CalculateIcon from '@mui/icons-material/Calculate';

export default function BottomBar({state, setState}) {
    const handleChange = (event, newValue) => {
        setState(newValue);
    };

    return (
        <BottomNavigation sx={{ width: '100%' }} value={state} onChange={handleChange}>
            <BottomNavigationAction
                label="Kasir"
                value="kasir"
                icon={<CalculateIcon />}
            />
            <BottomNavigationAction
                label="Riwayat"
                value="riwayat"
                icon={<RestoreIcon />}
            />
        </BottomNavigation>
    );
}
