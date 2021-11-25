import { Grid, TextField } from '@mui/material'
import React from 'react'
import Autocomplete from '@mui/material/Autocomplete';
import { StyledAutoComplete, StyledTextField } from '../GlobalElements';
import SiteButton from '../Button';

export default function UserForm(props: any) {
    const {
        // formField: {
        //     firstName,
        //     lastName,
        //     mobile,
        //     email,
        //     address1,
        //     address2,
        //     city
        // }
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
                        variant="outlined"
                        placeholder="First Name"
                        fullWidth />
                </Grid>
                <Grid item md={6}>
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
                </Grid>
            </Grid>
        </div>
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