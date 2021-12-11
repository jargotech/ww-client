import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledAutoComplete } from './GlobalElements';

export default function BrandAutoComplete({data}:any) {
    return (
        <StyledAutoComplete
            disablePortal
            multiple
            limitTags={2}
            id="all-brands"
            options={BrandName}
            onChange={(e, value) => {
                // consol e.log(value);
                data.setFieldValue(
                    "brands",
                    value !== null ? value : data.initialValues.brands
                );
            }}
            fullWidth={true}
            sx={{ margin: '20px 0px' }}
            renderInput={(params) => <TextField {...params} name="brands" variant="filled" label="Brands" />}
        />
    );
}

const BrandName = [
    'Volkswagen',
    'Toyota',
    'Daimler',
    'Ford Motor'
];
