import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { StyledAutoComplete } from './GlobalElements';
import { CarService } from '../services/cars/carService';

export default function BrandAutoComplete({ formikData, apiData }: any) {
    // States 


    // Varible


    // Function


    // Effects
    return (
        <StyledAutoComplete
            disablePortal
            multiple
            limitTags={2}
            id="all-brands"
            options={
                BrandName
                // apiData &&
                // apiData.map((brand: any) => (
                //     brand.name
                // ))
            }
            onChange={(e, value) => {
                // consol e.log(value);
                formikData.setFieldValue(
                    "brands",
                    value !== null ? value : formikData.initialValues.brands
                );
            }}
            fullWidth={true}
            sx={{ margin: '20px 0px' }}
            // renderInput={(params) => <TextField {...params} name="brands" variant="filled" label="Brands" />}
            renderInput={(params) => <TextField {...params} name="brands" placeholder="Brands" />}
        />
    );
}

const BrandName = [
    'Volkswagen',
    'Toyota',
    'Daimler',
    'Ford Motor'
];
