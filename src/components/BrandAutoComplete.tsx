import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledAutoComplete } from './GlobalElements';

export default function BrandAutoComplete() {
    return (
        <StyledAutoComplete
            disablePortal
            id="all-brands"
            options={BrandName}
            fullWidth={true}
            sx={{ margin: '20px 0px' }}
            renderInput={(params) => <TextField {...params} placeholder="Brands" />}
        />
    );
}

const BrandName = [
    { label: 'Volkswagen' },
    { label: 'Toyota' },
    { label: 'Daimler' },
    { label: 'Ford Motor' },
];
