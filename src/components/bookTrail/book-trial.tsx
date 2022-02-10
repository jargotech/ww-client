/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Box,
  Button,
  CircularProgress,
  Container,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  Step,
  StepLabel,
  Stepper,
} from "@mui/material";
import SiteButton from "../Button";
import CarCards from "../carCards";
import { QontoConnector, QontoStepIcon } from "../stepper/stepperElements";
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import UserForm from "../form/userForm";
import OtpForm from "../form/otpForm";
import MakeOffer from "../form/makeOffer";
import Alert from "@mui/material/Alert";
import StyledStepper from "../stepper/stepper";
import MediaQuery from "react-responsive";
import router from "next/router";
import { convertToNum } from "../../utils/currecyFormatter";
import { OtpService } from "../../services/user/otpService";
import { BookTrialService } from "../../services/bookTrial/bookTrialService";
import SuccesBookingPng from "../../../public/success-booking.png";
import Link from "next/link";

const steps = ["step1", "step2"];
export default function BookTrail({ carData }: any) {
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState();
  const [diableButton, setDisableButton] = useState(true);
  const [otpData, setOtpData] = useState<any>();
  const [otpNumber, setOtpNumber] = useState<any>();
  const [isVeryfiedUser, setIsVeryfiedUser] = useState<any>();
  const [trialBooking, setTrialBooking] = useState<any>();
  const [bookTrial, setBookTrial] = useState<any>();

  // Variable
  const isLastStep = activeStep === steps.length - 1;
  const BookTrailInitialValues = {
    makeOffer: "",
    address1: "",
    address2: "",
    trailDate: null,
    city: { city: "" },
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const minPrice = carData[0]?.Car_Detail.minPrice;
  const maxPrice = carData[0]?.Car_Detail.maxPrice;

  const BookTrialSchema = [
    Yup.object().shape({
      makeOffer: Yup.string(),
    }),
    Yup.object().shape({
      address1: Yup.string().required("Field cannot be blank"),
      address2: Yup.string(),
      city: Yup.object({
        name: Yup.string().required("Field cannot be blank"),
      }),
      trailDate: Yup.date().nullable().required("Field cannot be blank"),
    }),
  ];

  const currentValidationSchema = BookTrialSchema[activeStep];

  // Functions

  function _sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  async function _submitForm(values: any, actions: any) {
    await _sleep(1000);
    console.log(values);
  }

  function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      _submitForm(values, actions);
      // setActiveStep(activeStep + 1);
    } else if (activeStep == 1) {
      setActiveStep(activeStep + 1);
      actions.setSubmitting(false);
    } else {
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
    } else {
      setDisableButton(true);
    }
  };

  const handleDisableButton = (activeStep: any, props: any) => {
    if (activeStep == 0) {
      return diableButton;
    } else {
      return !(props.isValid && props.dirty && !props.isSubmitting);
    }
  };

  const overflowHidden = (hide: any) => {
    if (hide) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // Effects
  useEffect(() => {
    if (steps?.length == activeStep) {
      // This is last step
      // setTimeout(() => {
      //   router.push("/");
      //   overflowHidden(false);
      // }, 2000);
    }
  }, [activeStep]);

  useEffect(() => {
    if (isVeryfiedUser) {
    }
  }, [isVeryfiedUser]);

  return (
    <section className="book-trail">
      <Container maxWidth="lg">
        <h3>Book Trail</h3>
        <Grid
          container
          spacing={2}
          sx={{
            " @media(maxWidth:767px)": {
              justifyContent: "center !important",
            },
          }}
        >
          <Grid item xs={12} md={6} className="order-md-2">
            <MediaQuery query="(min-width: 992px)">
              <StyledStepper activeStep={activeStep} steps={steps} />
            </MediaQuery>
            <h5>{activeStep == 0 ? "Make an offer" : "Help us to know you"}</h5>
            {activeStep === steps.length ? (
              <div>
                <div className="dropbox"></div>
                <div className="succes-card">
                  {overflowHidden(true)}
                  <img src={SuccesBookingPng.src} alt="succes booking" />
                  <h4>You’ve sucessfully booked trail!</h4>
                  <p>
                    You will be receiving a confirmation on your registered
                    mobile number & email.
                  </p>
                  <Link href="/">Explore Collection</Link>
                </div>
              </div>
            ) : (
              <Formik
                initialValues={BookTrailInitialValues}
                validationSchema={currentValidationSchema}
                onSubmit={_handleSubmit}
              >
                {(props: any) => (
                  <Form id="book-trail" autoComplete="off" className="car-from">
                    {/* {_renderStepContent(activeStep)} */}
                    {activeStep == 0 ? (
                      <MakeOffer
                        childtoParent={childtoParent}
                        carInfo={carData}
                        formik={props}
                      />
                    ) : isLastStep ? (
                      <UserForm formik={props} />
                    ) : null}
                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "20px 0 0 auto",
                      }}
                    >
                      <SiteButton
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        text="Back"
                      />

                      <div className="position-relative">
                        <SiteButton
                          type="submit"
                          styles={{ marginLeft: "auto" }}
                          disabled={handleDisableButton(activeStep, props)}
                          // disabled={!(props.isValid && props.dirty)}
                          text={
                            isLastStep
                              ? "Done"
                              : activeStep == 1
                              ? "Book"
                              : "Next"
                          }
                          arrow={isLastStep ? false : true}
                        />

                        {props.isSubmitting && (
                          <CircularProgress
                            sx={{
                              position: "absolute",
                              top: "25%",
                              left: "40%",
                              transform: "translate(-50%,-50%)",
                              color: "#640E27",
                            }}
                            size={24}
                          />
                        )}
                      </div>
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
            <Grid item lg={9} sx={{ margin: "0 auto" }}>
              <CarCards
                Car_Images={carData[0]?.Car_Images}
                Car_Detail={carData[0]?.Car_Detail}
                variant="card2"
                hideButton={true}
                style={{ marginBottom: "10px" }}
              />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
