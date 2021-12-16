import { Box, Button, CircularProgress, Container, FormControl, Grid, Input, InputAdornment, InputLabel, Step, StepLabel, Stepper } from '@mui/material'
import SiteButton from '../Button'
import CarCards from '../carCards'
import { QontoConnector, QontoStepIcon } from '../stepper/stepperElements'
import React, { useState, useEffect } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import UserForm from '../form/userForm'
import OtpForm from '../form/otpForm'
import MakeOffer from '../form/makeOffer'
import Alert from '@mui/material/Alert';
import StyledStepper from '../stepper/stepper';
import MediaQuery from 'react-responsive';
import router from 'next/router';
import { convertToNum } from '../../utils/currecyFormatter';
import { OtpService } from '../../services/user/otpService';
import { BookTrialService } from '../../services/bookTrial/bookTrialService';

const steps = ['step1', 'step2', 'step3'];
export default function BookTrail({ carData }: any) {

    // States
    const [activeStep, setActiveStep] = useState(0);
    const [data, setData] = useState();
    const [diableButton, setDisableButton] = useState(true);
    const [emailId, setEmailId] = useState<any>();
    const [otpNumber, setOtpNumber] = useState<any>();
    const [isVeryfiedUser, setIsVeryfiedUser] = useState<any>();
    const [trialBooking, setTrialBooking] = useState<any>();
    const [bookTrial, setBookTrial] = useState<any>();



    // Variable
    const isLastStep = activeStep === steps.length - 1;
    const BookTrailInitialValues = {
        makeOffer: '',
        firstName: '',
        lastName: '',
        mobile: '',
        email: '',
        address1: '',
        address2: '',
        trailDate: null,
        city: { name: '' },
        otp1: '',
        otp2: '',
        otp3: '',
        otp4: '',
        otp5: '',
        otp6: '',


    }

    const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const minPrice = carData[0]?.Car_Detail.minPrice;
    const maxPrice = carData[0]?.Car_Detail.maxPrice;

    const BookTrialSchema = [
        Yup.object().shape({
            makeOffer: Yup.string(),
        }),
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
            email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
            address1: Yup.string().required('Field cannot be blank'),
            address2: Yup.string(),
            city: Yup.object({
                name: Yup.string().required('Field cannot be blank'),
            }),
            trailDate: Yup.date().nullable().required('Field cannot be blank')
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
    const otpService = new OtpService();
    const bookTrialService = new BookTrialService();




    // Functions

    function _sleep(ms: any) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    async function _submitForm(values: any, actions: any) {
        await _sleep(1000);
        // alert(JSON.stringify(values, null, 2));
        // _createBooking(myPost);
        // setData(values);
        // console.log(JSON.stringify(values, null, 2));
        const otp =
            `
            ${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}
            `

        console.log(otp.toString());

        const bookingTrialData = {
            userId: "617adf4b4e038fb89273f6e3",
            carId: carData[0]?.Car_Detail?._id,
            cityId: values?.city?.stateId,
            Address1: values?.address1,
            pincode: "401107",
            bookOnDateTime: values?.trailDate,
            status: "Available"
        }
        setTrialBooking(bookingTrialData)
        // actions.setSubmitting(false);
        // console.log(trialBooking);
        // console.log(bookingTrialData);

        // Uncomment after testing
        // setActiveStep(activeStep + 1);
    }

    function _handleSubmit(values: any, actions: any) {
        if (isLastStep) {
            _submitForm(values, actions);
        }
        else if (activeStep == 1) {
            console.log(values.email);
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
            setEmailId(values.email)

        }
        else {
            setActiveStep(activeStep + 1);
            actions.setTouched({});
            actions.setSubmitting(false);
        }
    }

    function _handleBack() {
        setActiveStep(activeStep - 1);
    }

    const childtoParent = (value: any) => {
        // setDisableButton(value);
        // console.log(value);
        if (convertToNum(value) > minPrice) {
            setDisableButton(false);
        }
        else {
            setDisableButton(true);
        }
    }

    const handleDisableButton = (activeStep: any, props: any) => {
        if (activeStep == 0) {
            return diableButton;
        }
        else {
            return !(props.isValid && props.dirty)
        }
    }

    const _generateOtp = (emailData: any) => {
        const payload = {
            emailId: emailData
        };
        const optData = otpService.generateOtp(payload);
        optData.then((res: any) => {
            if (res.status == 200) {
                console.log(res.data.data);
            }
        })
    }
    const _verifyOtp = (otp: any) => {
        const payload = {
            emailId: emailId,
            otp: otp
        };
        const optData = otpService.verifyOtp(payload);
        optData.then((res: any) => {
            if (res.status == 200) {
                console.log(res.data.data);
                // store jwt in the localStorage
                // localStorage.setItem('jwt', res.data.data);
                setIsVeryfiedUser(true);

            }
        })
    }

    const _bookTrialService = (payload: any) => {
        const bookTrialServiceData = bookTrialService.bookTrialService(payload);
        bookTrialServiceData.then((res) => {
            if (res.status == 200) {
                console.log(res.data.data);
            }
        })
    }

    // Effects
    useEffect(() => {
        if (steps?.length == activeStep) {
            // This is last step
            setTimeout(() => {
                // console.log('redirecting...')
                router.push('/');
            }, 2000);
        }
    }, [activeStep]);

    useEffect(() => {
        if (emailId) {
            _generateOtp(emailId);
        }
    }, [emailId]);

    useEffect(() => {
        if (isVeryfiedUser) {

        }
    }, [isVeryfiedUser]);

    useEffect(() => {
        console.log(trialBooking);
        if (trialBooking)
            _bookTrialService(trialBooking)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [trialBooking]);


    return (
        <section className="book-trail">
            <Container maxWidth="lg" >
                <h3>Book Trail</h3>
                <Grid
                    container
                    spacing={2}
                    sx={{
                        ' @media(maxWidth:767px)': {
                            justifyContent: 'center !important'
                        }
                    }}>
                    <Grid item xs={12} md={6} className="order-md-2">
                        <MediaQuery query="(min-width: 992px)">
                            <StyledStepper activeStep={activeStep} steps={steps} />
                        </MediaQuery>
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
                                                    <MakeOffer childtoParent={childtoParent} carInfo={carData} formik={props} />
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
                                                type="submit"
                                                styles={{ marginLeft: 'auto' }}
                                                disabled={handleDisableButton(activeStep, props)}
                                                // disabled={!(props.isValid && props.dirty)}
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
                    <Grid item xs={12} lg={6} className="order-md-1">
                        <MediaQuery query="(max-width: 992px)">
                            <StyledStepper activeStep={activeStep} steps={steps} />
                        </MediaQuery>
                        <Grid item lg={9} sx={{ margin: '0 auto' }}>
                            <CarCards Car_Images={carData[0]?.Car_Images} Car_Detail={carData[0]?.Car_Detail} variant="card2" hideButton={true} style={{ marginBottom: '10px' }} />
                        </Grid>
                    </Grid>
                </Grid>
            </Container>

        </section >
    )
}
