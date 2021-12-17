/* eslint-disable react-hooks/exhaustive-deps */
import { DateTimePicker, LocalizationProvider, TabPanelProps } from '@mui/lab';
import { Tabs, Tab, Box, Typography, Grid, TextField } from '@mui/material'
import { Formik, Form } from 'formik';
import React, { useState, useEffect } from 'react'
import { StyledAutoComplete, StyledTextField } from '../GlobalElements';
import * as Yup from 'yup';
import SiteButton from '../Button';
import OtpForm from '../form/otpForm';

function TabPanel(props: any) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <div>
                    {children}
                </div>
            )}
        </div>
    );
}


export default function Authenticate({ closeModal, generateOtp, verifyOtp }: any) {
    // States
    const [value, setValue] = useState(0);
    const [loggedInData, setLoggedInData] = useState<any>();
    const [otpModal, setOptModal] = useState(false);
    const [otpData, setOtpData] = useState<any>();

    // Variable
    const validationSchema1 = Yup.object().shape({
        emailId: Yup.string().required('Field cannot be blank'),
        phoneNumber: Yup.string().required('Field cannot be blank'),
    });
    const validationSchema2 = Yup.object().shape({
        firstName: Yup.string().required('Field cannot be blank'),
        lastName: Yup.string().required('Field cannot be blank'),
        email: Yup.string().required('Field cannot be blank'),
        phone: Yup.string().required('Field cannot be blank'),
    });
    const validationSchema3 = {

    }

    const initialValues1 = {
        emailId: '',
        phoneNumber: '',
    };
    const initialValues2 = {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address1: '',
        address2: '',
        pincode: '',
    };

    const initialValues3 = {
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',

    }


    // Functions
    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handelSubmit1 = (values: any) => {
        console.log(values)
        setLoggedInData(values);
        handleOtpOpen();

    }
    const handelSubmit2 = (values: any) => {
        console.log(values)

    }

    const handelSubmit3 = (values: any) => {
        console.log(values)
        const otp =
            `
            ${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}
            `
        setOtpData(otp.toString().replaceAll(/\s/g, ''));
    }

    const handleOtpOpen = () => setOptModal(true)
    const handleOtpClose = () => setOptModal(false)



    // Effects

    useEffect(() => {
        if (loggedInData) {
            generateOtp(loggedInData);
        }
    }, [loggedInData]);

    useEffect(() => {
        if (otpData) {
            verifyOtp(loggedInData.emailId, otpData)
        }
    }, [otpData]);
    return (
        <>
            {
                otpModal &&

                    otpModal
                    ?
                    (
                        <div className="authentication-otp-form">
                            <Formik
                                initialValues={initialValues3}
                                // validationSchema={validationSchema}
                                onSubmit={handelSubmit3}
                            >
                                {(formik) => (
                                    <Form autoComplete="off">
                                        <div className="otp-authentication-wrapper">
                                            <div>
                                                <OtpForm formik={formik} />
                                                <div className="btn-wrapper">
                                                    <SiteButton
                                                        type="submit"
                                                        text="Sing In"
                                                        styles={{ marginLeft: 'auto' }}
                                                        // disabled={!(props.isValid && props.dirty)}
                                                        arrow={false}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    )
                    :
                    (

                        <div className="authentication-user-form">
                            <Tabs value={value} onChange={handleChange} className="authenticationTabs">
                                <Tab label="Sing In" />
                                <Tab label="Sing Up" />

                            </Tabs>
                            <TabPanel value={value} index={0}>
                                <Formik
                                    initialValues={initialValues1}
                                    validationSchema={validationSchema1}
                                    onSubmit={handelSubmit1}
                                >
                                    {(formik) => (
                                        <Form autoComplete="off">
                                            <Grid container spacing={2}>
                                                <Grid item xs={12} className="authentication-form-field">
                                                    <StyledTextField
                                                        required
                                                        autoComplete={'' + Math.random()}
                                                        name='emailId'
                                                        value={formik.values.emailId}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        error
                                                        label="Email"
                                                        // helperText={formik.touched.firstName && formik.errors.firstName}
                                                        fullWidth />
                                                    <span className="error">{formik.touched.emailId && formik.errors.emailId}</span>
                                                </Grid>
                                                <Grid item xs={12} className="authentication-form-field">
                                                    <StyledTextField
                                                        required
                                                        autoComplete={'' + Math.random()}
                                                        name='phoneNumber'
                                                        value={formik.values.phoneNumber}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        error
                                                        label="Phone No"
                                                        // helperText={formik.touched.firstName && formik.errors.firstName}
                                                        fullWidth />
                                                    <span className="error">{formik.touched.phoneNumber && formik.errors.phoneNumber}</span>
                                                </Grid>
                                            </Grid>
                                            <div className="btn-wrapper">
                                                <SiteButton
                                                    type="submit"
                                                    text="Sing In"
                                                    styles={{ marginLeft: 'auto' }}
                                                    // disabled={!(props.isValid && props.dirty)}
                                                    arrow={false}
                                                />
                                            </div>
                                        </Form>
                                    )}
                                </Formik>

                            </TabPanel>
                            <TabPanel value={value} index={1}>
                                <Formik
                                    initialValues={initialValues2}
                                    validationSchema={validationSchema2}
                                    onSubmit={handelSubmit2}
                                >
                                    {(formik) => (
                                        <Form autoComplete="off">
                                            <Grid container spacing={2}>
                                                <Grid item xs={6} md={6} className="authentication-form-field">
                                                    <StyledTextField
                                                        required
                                                        autoComplete={'' + Math.random()}
                                                        name='firstName'
                                                        value={formik.values.firstName}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        error
                                                        label="First Name"
                                                        // helperText={formik.touched.firstName && formik.errors.firstName}
                                                        fullWidth />
                                                    <span className="error">{formik.touched.firstName && formik.errors.firstName}</span>
                                                </Grid>
                                                <Grid item xs={6} md={6} className="authentication-form-field">
                                                    <StyledTextField
                                                        required
                                                        name='lastName'
                                                        autoComplete={'' + Math.random()}
                                                        value={formik.values.lastName}
                                                        error
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        label="Last Name"
                                                        fullWidth />
                                                    <span className="error">{formik.errors.lastName && formik.touched.lastName ? formik.errors.lastName : null}</span>
                                                </Grid>
                                                <Grid item xs={6} md={6} className="authentication-form-field">
                                                    <StyledTextField
                                                        required
                                                        name='phone'
                                                        autoComplete={'' + Math.random()}
                                                        error
                                                        value={formik.values.phone}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        label="Mobile"
                                                        fullWidth />
                                                    <span className="error">{formik.touched.phone && formik.errors.phone}</span>
                                                </Grid>
                                                <Grid item xs={6} md={6} className="authentication-form-field">
                                                    <StyledTextField
                                                        required
                                                        autoComplete={'' + Math.random()}
                                                        name='email'
                                                        error
                                                        value={formik.values.email}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        label="Email"
                                                        fullWidth />
                                                    <span className="error">{formik.touched.email && formik.errors.email}</span>
                                                </Grid>
                                                <Grid item xs={12} className="authentication-form-field">
                                                    <StyledTextField
                                                        name='address1'
                                                        autoComplete={'' + Math.random()}
                                                        error
                                                        multiline
                                                        value={formik.values.address1}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        label="Address Line 1"
                                                        fullWidth />
                                                    <span className="error">{formik.touched.address1 && formik.errors.address1}</span>
                                                </Grid>
                                                <Grid item xs={12} className="authentication-form-field">
                                                    <StyledTextField
                                                        name='address2'
                                                        multiline
                                                        autoComplete={'' + Math.random()}
                                                        value={formik.values.address2}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        label="Address Line 2"
                                                        fullWidth />
                                                    <span className="error">{formik.touched.address2 && formik.errors.address2}</span>
                                                </Grid>
                                                <Grid item xs={12} className="authentication-form-field">
                                                    <StyledTextField
                                                        name='pincode'
                                                        multiline
                                                        autoComplete={'' + Math.random()}
                                                        value={formik.values.pincode}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        variant="filled"
                                                        label="Pin Code"
                                                        fullWidth />
                                                    <span className="error">{formik.touched.pincode && formik.errors.pincode}</span>
                                                </Grid>
                                            </Grid>
                                            <div className="btn-wrapper">
                                                <SiteButton
                                                    type="submit"
                                                    text="Sing Up"
                                                    styles={{ marginLeft: 'auto' }}
                                                    // disabled={!(props.isValid && props.dirty)}
                                                    arrow={false}
                                                />
                                            </div>

                                        </Form>

                                    )}
                                </Formik>
                            </TabPanel>

                        </div>
                    )
            }
        </>

    )
}
