import { Box, Button, CircularProgress, Container, FormControl, Grid, Input, InputAdornment, InputLabel, Step, StepLabel, Stepper } from '@mui/material'
import SiteButton from '../Button'
import CarCards from '../carCards'
import React, { useEffect, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserForm from '../form/userForm'
import OtpForm from '../form/otpForm'
import Alert from '@mui/material/Alert';
import StyledStepper from '../stepper/stepper';
import CarDetailForm from '../form/car-detail-form';
import UploadInput from '../form/upload/uploadInput';
import MediaQuery from 'react-responsive';
import { useRouter } from 'next/router'
import Image from 'next/image'
import HelloImage from '../../../public/Hello-bro.svg'

const steps = ['step1', 'step2', 'step3', 'step4'];
export default function SellCarComponent() {

    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState();
    const isLastStep = activeStep === steps.length - 1;
    const router = useRouter()

    const BookTrailInitialValues = {
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        address1: '',
        address2: '',
        city: {},
        trailDate:null,
        year: '',
        manifacture: '',
        model: '',
        kmTraveled: '',
        fuelType: '',
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
            firstName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Field cannot be blank'),
            lastName: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Field cannot be blank'),
            mobile: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required('Field cannot be blank'),
            email: Yup.string().email('Must be a valid email').max(255).required('Field cannot be blank'),
            address1: Yup.string().required('Field cannot be blank'),
            address2: Yup.string(),
            city: Yup.object({
                name: Yup.string().required('Field cannot be blank'),
            })
        }),

        Yup.object().shape({
            year: Yup.number().min(4).required(),
            manifacture: Yup.string()
                .min(2, 'Too Short!')
                .max(50, 'Too Long!')
                .required('Field cannot be blank'),
            model: Yup.string()
                .required('Field cannot be blank'),
            kmTraveled: Yup.number().min(3).required('Field cannot be blank'),
            fuelType: Yup.string().required('Field cannot be blank'),
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

    const RedirectHomePage = () => {
        router.push('/')
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
                <h3>Sell Car</h3>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        ' @media(maxWidth:767px)': {
                            justifyContent: 'center !important'
                        }
                    }}>
                    <Grid item lg={6} className="order-md-2">
                        <MediaQuery query="(min-width: 992px)">
                            <StyledStepper activeStep={activeStep} steps={steps} />
                        </MediaQuery>
                        <h5>Hear from our Inspection team </h5>

                        {activeStep === steps.length ? (
                            (
                                <Alert variant="outlined" severity="success">
                                    This is a success alert — check it out!
                                    {RedirectHomePage()}
                                </Alert>
                            )
                        ) : (
                            <Formik
                                initialValues={BookTrailInitialValues}
                                validationSchema={currentValidationSchema}
                                onSubmit={_handleSubmit}
                            >
                                {(props: any) => (
                                    <Form id="sell-car" autoComplete="off" className={isLastStep ? 'car-form is-active' : 'car-from'}>
                                        {/* {_renderStepContent(activeStep)} */}
                                        {
                                            activeStep == 0
                                                ?
                                                (
                                                    <UserForm formik={props} />
                                                )
                                                :
                                                activeStep == 1
                                                    ?
                                                    (<CarDetailForm formik={props} />)
                                                    :
                                                    activeStep == 2
                                                        ?
                                                        (<UploadInput />)
                                                        :
                                                        activeStep == 3
                                                            ?
                                                            (<OtpForm formik={props} />)
                                                            : null
                                        }
                                        <div style={{ position: 'relative', display: 'table', margin: '20px 0 0 auto' }}>
                                            <SiteButton
                                                type="submit"
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
                        <MediaQuery query="(max-width: 992px)">
                            <StyledStepper activeStep={activeStep} steps={steps} />
                        </MediaQuery>
                        <Grid item lg={9} sx={{ margin: '0 auto', alignItems: 'center' }} >
                            {/* <CarCards variant="card2" hideButton={true} style={{ marginBottom: '10px' }} /> */}
                            <Image src={HelloImage} height={480} width={560} alt="image" />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </section >
    )
}
