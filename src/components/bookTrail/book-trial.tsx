/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid } from "@mui/material";
import SiteButton from "../Button";
import CarCards from "../carCards";
import React, { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import UserForm from "../form/userForm";
import MakeOffer from "../form/makeOffer";
import Alert from "@mui/material/Alert";
import StyledStepper from "../stepper/stepper";
import MediaQuery from "react-responsive";
import router from "next/router";
import { convertToNum } from "../../utils/currecyFormatter";
import SuccesBookingPng from "../../../public/success-booking.png";
import Link from "next/link";
import { CarService } from "../../services/cars/carService";
import { userJwtData } from "../../utils/getAccessToken";
import moment from "moment";
import InfoIcon from "@mui/icons-material/Info";

const steps = ["step1", "step2"];
export default function BookTrail({ carData, maxPriceValue }: any) {
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [diableButton, setDisableButton] = useState(true);
  const [bookTrial, setBookTrial] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [bookingError, setBookingError] = useState<any>();

  // Variable
  const isLastStep = activeStep === steps.length - 1;
  let BookTrailInitialValues = {
    makeOffer: "",
    address1: "",
    address2: "",
    pincode: "",
    trailDate: null,
    city: "",
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
      city: Yup.string().required("Field cannot be blank"),
      pincode: Yup.number().required("Field cannot be blank"),
      trailDate: Yup.date().nullable().required("Field cannot be blank"),
    }),
  ];

  const currentValidationSchema = BookTrialSchema[activeStep];
  const carService = new CarService();

  // Functions

  function _sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleBackToCarCollection = () => {
    router.push("/car-collection");
  };

  async function _submitForm(values: any, actions: any) {
    const { makeOffer, address1, address2, trailDate, city, pincode } = values;
    console.log(values);
    setBookTrial({
      userId: userJwtData(),
      carId: carData[0]._id,
      cityId: city,
      Address1: address1,
      Address2: address2,
      pincode: pincode,
      requestPrice: Number(makeOffer.replace(/,/g, "")),
      bookOnDateTime: moment(trailDate).format("MM/DD/YYYY hh:00 a"),
      status: "Available",
    });
  }

  function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      _submitForm(values, actions);
      actions.restForm();
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
    // if (convertToNum(value) >= maxPrice) {
    //   setDisableButton(false);
    // } else {
    //   setDisableButton(true);
    // }
    return true;
  };

  const handleDisableButton = (activeStep: any, props: any) => {
    // if (activeStep == 0) {
    //   return diableButton;
    // } else {
    //   return !(props.isValid && props.dirty) || loading;
    // }
    return !(props.isValid && props.dirty) || loading;
  };

  const overflowHidden = (hide: any) => {
    if (hide) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  };

  // book trial api function

  const _bookTrail = async (payload: any) => {
    setBookingError(null);
    setLoading(true);
    try {
      const bookTrailApiCall = await carService.bookTrial(payload);
      if (!bookTrailApiCall.data.error) {
        console.log(bookTrailApiCall.data.data);
        setActiveStep(activeStep + 1);
        setLoading(false);
      } else {
        console.log(bookTrailApiCall.data.error);
        setLoading(false);
        setBookingError(bookTrailApiCall.data.error);
      }
    } catch (error: any) {
      let errorResponse = JSON.parse(error?.request?.response);
      console.log(errorResponse?.message);
      setBookingError(errorResponse?.message);
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (steps?.length == activeStep) {
      // This is last step
      setTimeout(() => {
        router.push("/car-collection");
        overflowHidden(false);
      }, 15000);
    }
  }, [activeStep]);

  useEffect(() => {
    if (bookTrial) {
      _bookTrail(bookTrial);
    }
  }, [bookTrial]);

  useEffect(() => {
    // if (carData) {
    //   console.log(carData);
    //   // BookTrailInitialValues["makeOffer"] = "This is string";
    //   BookTrailInitialValues["makeOffer"] =
    // }
  }, [carData]);

  return (
    <section className="book-trail">
      <Container maxWidth="lg">
        <h3>Book Trial</h3>
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
                  <h4 className="success">Success</h4>
                  <img src={SuccesBookingPng.src} alt="succes booking" />
                  {/* <p>
                    You will be receiving a confirmation on your registered
                    mobile number & email.
                  </p> */}
                  <h4>
                    Thanks for finding faith in us.
                    <br /> Our Sales team will reach out to you shortly
                  </h4>
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
                        // childtoParent={childtoParent}
                        carInfo={carData}
                        formik={props}
                      />
                    ) : isLastStep ? (
                      <UserForm formik={props} />
                    ) : null}
                    <div>
                      <Alert
                        severity="warning"
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          marginTop: "15px",
                          padding: "5px 10px",
                          "& .MuiAlert-message": {
                            padding: "5px 0px !important",
                          },
                        }}
                        iconMapping={{
                          warning: <InfoIcon fontSize="inherit" />,
                        }}
                      >
                        {activeStep == 0
                          ? "Subject to offers approved by our sales team."
                          : "Subject to regional proximity!"}
                      </Alert>
                    </div>

                    <div
                      style={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "space-between",
                        margin: "20px 0 0 auto",
                      }}
                    >
                      {activeStep == 0 ? (
                        <SiteButton
                          onClick={handleBackToCarCollection}
                          text="back"
                          buttonVariant="tertiary"
                        />
                      ) : (
                        <SiteButton
                          disabled={activeStep === 0}
                          onClick={handleBack}
                          text="Back"
                          buttonVariant="tertiary"
                        />
                      )}

                      <div className="position-relative">
                        <SiteButton
                          type="submit"
                          styles={{ marginLeft: "auto" }}
                          disabled={handleDisableButton(activeStep, props)}
                          // disabled={!(props.isValid && props.dirty)}
                          text={loading ? "Booking..." : "Book"}
                          arrow={isLastStep ? false : true}
                        />
                      </div>
                    </div>
                    <span className="Authentication-error error">
                      {bookingError}
                    </span>
                  </Form>
                )}
              </Formik>
            )}
          </Grid>
          <Grid item xs={12} lg={6} className="order-md-1">
            {/* <MediaQuery query="(max-width: 992px)">
              <StyledStepper activeStep={activeStep} steps={steps} />
            </MediaQuery> */}
            <Grid item lg={9} sx={{ margin: "0 auto" }}>
              <CarCards
                {...carData[0]}
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
