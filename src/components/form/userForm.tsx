import { FormHelperText, Grid, TextField } from '@mui/material'
import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { StyledAutoComplete, StyledTextField } from '../GlobalElements';
import SiteButton from '../Button';
import { ErrorMessage, Field } from 'formik';

export default function UserForm(props: any) {
    const {
        formik
    } = props;
    return (
        <div>
            <Grid container spacing={2}>
                <Grid item md={6}>
                    <StyledTextField
                        name='firstName'
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        placeholder="First Name"
                        fullWidth />
                    <span className="error">{formik.touched.firstName && formik.errors.firstName}</span>
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='lastName'
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        placeholder="Last Name"
                        fullWidth />
                    <span className="error">{formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}</span>
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='mobile'
                        value={formik.values.mobile}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        placeholder="Mobile"
                        fullWidth />
                    <span className="error">{formik.touched.mobile && formik.errors.mobile}</span>
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='email'
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        placeholder="Email"
                        fullWidth />
                    <span className="error">{formik.touched.email && formik.errors.email}</span>
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='address1'
                        value={formik.values.address1}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        placeholder="Address Line 1 "
                        fullWidth />
                    <span className="error">{formik.touched.address1 && formik.errors.address1}</span>
                </Grid>
                <Grid item md={6}>
                    <StyledTextField
                        name='address2'
                        value={formik.values.address2}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="outlined"
                        placeholder="Address Line 2 "
                        fullWidth />
                    <span className="error">{formik.touched.address2 && formik.errors.address2}</span>
                </Grid>
                <Grid item md={6}>
                    <StyledAutoComplete
                        autoComplete={false}
                        disablePortal
                        freeSolo
                        id="city"
                        options={cities}
                        getOptionLabel={(option: any) => option.name}
                        fullWidth={true}
                        onChange={(e, value) => {
                            // consol e.log(value);
                            formik.setFieldValue(
                                "city",
                                value !== null ? value : formik.initialValues.city
                            );
                        }}
                        renderInput={(params) => <TextField name="city" {...params} placeholder="City" />}
                    />
                    <span className="error">{formik.touched.city && formik.errors.city}</span>
                </Grid>
            </Grid>
        </div >
    )
}

const cities = [{
    name: "Pune",
    id: 3,
}, {
    name: "Mumbai",
    id: 2
}, {
    name: "Navi-Mumbai",
    id: 1
}];