import { Grid, TextField } from '@mui/material'
import React, { useState } from 'react'
import { StyledAutoComplete, StyledTextField } from '../GlobalElements';

export default function CarDetailForm(props: any) {
    const { formik } = props;

    const carFields = [
        {
            name: 'year',
            label: 'Year'
        },
        {
            name: 'manifacture',
            label: 'Manifacture'
        },
        {
            name: 'model',
            label: 'Model '
        },
        {
            name: 'kmTraveled',
            label: 'KM Traveled '
        },
        {
            name: 'fuelType',
            label: 'Fuel Type '
        },
        {
            name: 'fuelType',
            label: 'Fuel Type '
        },
    ]


    return (
        <div>
            <Grid container spacing={2}>
                {
                    carFields.map((carFields, index) => {
                        const Name = carFields.name;
                        return (
                            <Grid key={index} item md={6}>
                                <StyledTextField
                                    name={Name}
                                    value={formik.values.Name}
                                    onChange={formik.handleChange}
                                    variant="outlined"
                                    placeholder={carFields.label}
                                    fullWidth />
                            </Grid>
                        )

                    })
                }

                {/* <Grid item md={6}>
                    <StyledTextField
                        name='lastName'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        variant="outlined"
                        placeholder="Last Name"
                        fullWidth />
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='mobile'
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        variant="outlined"
                        placeholder="Mobile"
                        fullWidth />
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        variant="outlined"
                        placeholder="Email"
                        fullWidth />
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='address1'
                        value={formik.values.address1}
                        onChange={formik.handleChange}
                        variant="outlined"
                        placeholder="Address Line 1 "
                        fullWidth />
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='address2'
                        value={formik.values.address2}
                        onChange={formik.handleChange}
                        variant="outlined"
                        placeholder="Address Line 2 "
                        fullWidth />
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='address2'
                        value={formik.values.address2}
                        onChange={formik.handleChange}
                        variant="outlined"
                        placeholder="Address Line 2 "
                        fullWidth />
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='address2'
                        value={formik.values.address2}
                        onChange={formik.handleChange}
                        variant="outlined"
                        placeholder="Address Line 2 "
                        fullWidth />
                </Grid> */}

            </Grid>
        </div>
    )
}