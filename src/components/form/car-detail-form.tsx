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
                {/* {
                    carFields.map((carFields, index) => {
                        const Name = carFields.name;
                        return (
                            <Grid key={index} item md={6} className="book-trail-form-field">
                                <StyledTextField
                                    error
                                    required
                                    name={Name}
                                    value={formik.values.Name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    variant="filled"
                                    label={carFields.label}
                                    fullWidth />
                                <span className="error">{formik.touched.Name && formik.errors.Name}</span>
                            </Grid>
                        )

                    })
                } */}
                <Grid item xs={12} md={6} className="book-trail-form-field">
                    <StyledTextField
                        name='year'
                        type="number"
                        error
                        required
                        value={formik.values.year}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label='Year'
                        fullWidth />
                    <span className="error">{formik.touched.year && formik.errors.year}</span>
                </Grid>
                <Grid xs={12} item md={6} className="book-trail-form-field">
                    <StyledTextField
                        error
                        required
                        name='manifacture'
                        value={formik.values.manifacture}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label='Manufacture'
                        fullWidth />
                    <span className="error">{formik.touched.manifacture && formik.errors.manifacture}</span>
                </Grid>
                <Grid xs={12} item md={6} className="book-trail-form-field">
                    <StyledTextField
                        error
                        required
                        name='model'
                        value={formik.values.model}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label='Modal'
                        fullWidth />
                    <span className="error">{formik.touched.model && formik.errors.model}</span>
                </Grid>
                <Grid xs={12} item md={6} className="book-trail-form-field">
                    <StyledTextField
                        error
                        required
                        name='kmTraveled'
                        type="number"
                        value={formik.values.kmTraveled}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label="Km Traveled"
                        fullWidth />
                    <span className="error">{formik.touched.kmTraveled && formik.errors.kmTraveled}</span>
                </Grid>
                <Grid xs={12} item md={6} className="book-trail-form-field">
                    <StyledTextField
                        error
                        required
                        name='fuelType'
                        value={formik.values.fuelType}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label='Fule Type'
                        fullWidth />
                    <span className="error">{formik.touched.fuelType && formik.errors.fuelType}</span>
                </Grid>


            </Grid>
        </div>
    )
}