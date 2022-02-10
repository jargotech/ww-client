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
import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import UserForm from "../form/userForm";
import OtpForm from "../form/otpForm";
import Alert from "@mui/material/Alert";
import StyledStepper from "../stepper/stepper";
import CarDetailForm from "../form/car-detail-form";
import UploadInput from "../form/upload/uploadInput";
import MediaQuery from "react-responsive";
import { useRouter } from "next/router";
import Image from "next/image";
import HelloImage from "../../../public/Hello-bro.svg";
import moment from "moment";
import Link from "next/link";
import SuccesBookingPng from "../../../public/success-booking.png";
import { min } from "date-fns";

// const steps = ["step1", "step2", "step3", "step4"];
const steps = ["step1"];
export default function SellCarComponent() {
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState();
  const isLastStep = activeStep === steps.length - 1;
  const router = useRouter();

  const BookTrailInitialValues = {
    brand: "",
    model: "",
    year: new Date(),
    ownership: "",
    milage: "",
    fueltype: "",
    kmdriven: "",
    registrationState: "",
    pincode: "",
    city: "",
  };

  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const BookTrialSchema = Yup.object().shape({
    brand: Yup.string().required("This field can't be blank "),
    model: Yup.string().min(2).required("this field can't be blank"),
    year: Yup.string().required("Year cannot be empty"),
    ownership: Yup.string().required("This field can't be blank"),
    milage: Yup.number().min(2).required("This field can't be blank"),
    fueltype: Yup.string().required("This field can't be blank"),
    kmdriven: Yup.number().min(2).required("This field can't be blank"),
    registrationState: Yup.string().required("This field can't be blank"),
    pincode: Yup.number().required("This field can't be blank"),
    city: Yup.string().required("This field can't be blank"),
  });
  const currentValidationSchema = BookTrialSchema;

  function _sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const RedirectHomePage = () => {
    router.push("/");
  };
  async function _submitForm(values: any, actions: any) {
    await _sleep(1000);
    // alert(JSON.stringify(values, null, 2));
    // _createBooking(myPost);
    // setData(values);
    console.log(JSON.stringify(values, null, 2));
    const year = values?.year;
    console.log(moment(year).format("YYYY"));

    // actions.setSubmitting(false);

    setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      _submitForm(values, actions);
      setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

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
      setTimeout(() => {
        router.push("/");
        overflowHidden(false);
      }, 5000);
    }
  }, [activeStep]);
  return (
    <section className="book-trail">
      <Container maxWidth="lg">
        <h3>Sell Car</h3>
        <Grid
          container
          spacing={2}
          sx={{
            " @media(maxWidth:767px)": {
              justifyContent: "center !important",
            },
          }}
        >
          <Grid item lg={6} className="order-md-2">
            {/* <MediaQuery query="(min-width: 992px)">
              <StyledStepper activeStep={activeStep} steps={steps} />
            </MediaQuery> */}
            <h5>Hear from our Inspection team </h5>

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
                  <Form id="sell-car" autoComplete="off" className="car-from">
                    {/* {_renderStepContent(activeStep)} */}
                    {activeStep == 0 ? (
                      // OLD
                      // <UserForm formik={props} />
                      <CarDetailForm formik={props} />
                    ) : null}
                    <div
                      style={{
                        position: "relative",
                        display: "table",
                        margin: "20px 0 0 auto",
                      }}
                    >
                      <SiteButton
                        type="submit"
                        styles={{ marginLeft: "auto" }}
                        disabled={!(props.isValid && props.dirty)}
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
                  </Form>
                )}
              </Formik>
            )}
          </Grid>
          <Grid item lg={6} className="order-md-1">
            <MediaQuery query="(max-width: 992px)">
              <StyledStepper activeStep={activeStep} steps={steps} />
            </MediaQuery>
            <Grid item lg={9} sx={{ margin: "0 auto", alignItems: "center" }}>
              {/* <CarCards variant="card2" hideButton={true} style={{ marginBottom: '10px' }} /> */}
              <Image src={HelloImage} height={480} width={560} alt="image" />
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
