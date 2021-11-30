import { Box, Button, CircularProgress, Container, FormControl, Grid, Input, InputAdornment, InputLabel, Step, StepLabel, Stepper } from '@mui/material'
import SiteButton from '../Button'
import CarCards from '../carCards'
import { QontoConnector, QontoStepIcon } from '../stepper/stepperElements'
import React, { useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserForm from '../form/userForm'
import OtpForm from '../form/otpForm'
import MakeOffer from '../form/makeOffer'
import Alert from '@mui/material/Alert';
import StyledStepper from '../stepper/stepper';

const steps = ['Shipping address', 'step2', 'step3'];
export default function BookTrail() {

    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState();
    const isLastStep = activeStep === steps.length - 1;

    const BookTrailInitialValues = {
        makeOffer: '',
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        address1: '',
        address2: '',
        city: { name: "", id: null },
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',


    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/
    const BookTrialSchema = [
        Yup.object().shape({
            makeOffer: Yup.number().required(),
        }),

        Yup.object().shape({
            firstName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            lastName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Required'),
            mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid'),
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            address1: Yup.string().required('required'),
            address2: Yup.string(),
            city: Yup.object().required('required')
        }),

        Yup.object().shape({
            otp1: Yup.number().required(),
            otp2: Yup.number().required(),
            otp3: Yup.number().required(),
            otp4: Yup.number().required(),
            otp5: Yup.number().required(),
            otp6: Yup.number().required(),
        }),
    ]

    const currentValidationSchema = BookTrialSchema[activeStep];


    function _sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values: any, actions: any) {
        await _sleep(1000);
        // alert(JSON.stringify(values, null, 2));
        // _createBooking(myPost);
        // setData(values);
        console.log(JSON.stringify(values, null, 2));
        // actions.setSubmitting(false);

        setActiveStep(activeStep + 1);
    }

    function _handleSubmit(values: any, actions: any) {
        if (isLastStep) {
            _submitForm(values, actions);
        } else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }


    return (
        <section className="book-trail">
            <Container maxWidth="lg" >
                <h3>Book Trail</h3>
                <Grid container spacing={2} sx={{ justifyContent: 'center !important' }}>
                    <Grid item lg={6} className="order-md-2">
                        {/* <Box sx={{ maxWidth: '200px', marginBottom: '10px' }}>
                            <Stepper activeStep={activeStep} connector={<QontoConnector />} >
                                {
                                    steps.map(label => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={QontoStepIcon}></StepLabel>
                                        </Step>
                                    ))
                                }
                            </Stepper>
                        </Box> */}
                        <StyledStepper activeStep={activeStep} steps={steps} />
                        <h5>Make an offer and book a trail</h5>

                        {activeStep === steps.length ? (
                            (
                                <Alert variant="outlined" severity="success">
                                    This is a success alert — check it out!
                                </Alert>
                            )
                        ) : (
                            <Formik
                                initialValues={BookTrailInitialValues}
                                validationSchema={currentValidationSchema}
                                onSubmit={_handleSubmit}
                            >
                                {(props: any) => (
                                    <Form id="book-trail" autoComplete="off" className={isLastStep ? 'car-form is-active' : 'car-from'}>
                                        {/* {_renderStepContent(activeStep)} */}
                                        {
                                            activeStep == 0
                                                ?
                                                (
                                                    <MakeOffer formik={props} />
                                                )
                                                :
                                                activeStep == 1
                                                    ?
                                                    (<UserForm formik={props} />)
                                                    :
                                                    activeStep == 2
                                                        ?
                                                        (<OtpForm formik={props} />)
                                                        : null
                                        }
                                        <div style={{ position: 'relative', display: 'table', margin: '20px 0 0 auto' }}>
                                            <SiteButton
                                                styles={{ marginLeft: 'auto' }}
                                                disabled={!(props.isValid && props.dirty)}
                                                text={isLastStep ? 'Done' : activeStep == 1 ? 'Book' : 'Next'}
                                                arrow={isLastStep ? false : true}
                                            />

                                            {props.isSubmitting && (
                                                <CircularProgress sx={{ position: 'absolute', top: '25%', left: '40%', transform: 'translate(-50%,-50%)', color: '#640E27' }}
                                                    size={24}
                                                />
                                            )}
                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        )}
                    </Grid>
                    <Grid item lg={6} className="order-md-1">
                        <Grid item lg={9} sx={{ margin: '0 auto' }}>
                            <CarCards variant="card2" hideButton={true} style={{ marginBottom: '10px' }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </section >
    )
}
