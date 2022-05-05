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
import { CarService } from "../../services/cars/carService";
import { userJwtData } from "../../utils/getAccessToken";
import { margin } from "@mui/system";
import InfoIcon from "@mui/icons-material/Info";
import GppGoodIcon from "@mui/icons-material/GppGood";

// const steps = ["step1", "step2", "step3", "step4"];
const steps = ["step1"];
export default function SellCarComponent() {
  // States
  const [activeStep, setActiveStep] = useState(0);
  const [data, setData] = useState();
  const [sellCarData, setSellCarData] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [sellCarError, setSellCarError] = useState<any>();

  // Context

  // Variables
  const isLastStep = activeStep === steps.length - 1;
  const router = useRouter();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const BookTrailInitialValues = {
    brandId: "",
    otherBrands: "",
    modelId: "",
    year: new Date(),
    ownerShip: "",
    milege: "",
    fuelType: "",
    kmDriven: "",
    registrationStateId: "",
    pincode: "",
    cityName: "",
  };

  const BookTrialSchema = Yup.object().shape({
    brandId: Yup.string().required("This field can't be blank "),
    otherBrands: Yup.string(),
    modelId: Yup.string().min(2).required("This field can't be blank"),
    year: Yup.string().required("Year cannot be empty"),
    ownerShip: Yup.string().required("This field can't be blank"),
    // milege: Yup.number().min(2).required("This field can't be blank"),
    fuelType: Yup.string().required("This field can't be blank"),
    kmDriven: Yup.number().min(2).required("This field can't be blank"),
    registrationStateId: Yup.string().required("This field can't be blank"),
    pincode: Yup.number(),
    cityName: Yup.string().required("This field can't be blank"),
  });

  const currentValidationSchema = BookTrialSchema;
  const carService = new CarService();

  // Functions

  function _sleep(ms: any) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const RedirectHomePage = () => {
    router.push("/");
  };

  async function _submitForm(values: any) {
    // await _sleep(1000);
    const {
      brandId,
      modelId,
      year,
      otherBrands,
      ownerShip,
      fuelType,
      kmDriven,
      registrationStateId,
      pincode,
      cityName,
    } = values;
    // console.log(JSON.stringify(values, null, 2));
    // const year = values?.year;
    // console.log(moment(year).format("YYYY"));
    setSellCarData({
      userId: userJwtData(),
      brandId,
      modelId,
      otherName: otherBrands,
      year: moment(year).format("YYYY"),
      ownerShip,
      fuelType,
      kmDriven,
      registrationStateId,
      pincode,
      cityName,
    });
    // setActiveStep(activeStep + 1);
  }

  function _handleSubmit(values: any, actions: any) {
    if (isLastStep) {
      _submitForm(values);
      actions.resetForm();

      // setActiveStep(activeStep + 1);
    } else {
      setActiveStep(activeStep + 1);
      actions.setTouched({});
      actions.setSubmitting(false);
      actions.resetForm();
    }
  }

  function _handleBack() {
    setActiveStep(activeStep - 1);
  }

  const overflowHidden = (hide: any) => {
    if (typeof window !== "undefined") {
      if (hide) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    }
  };

  const _sellCar = async (payload: any) => {
    setSellCarError(null);
    setLoading(true);
    try {
      const sellCarApiCall = await carService.sellCar(payload);
      if (!sellCarApiCall.data.error) {
        console.log(sellCarApiCall.data);
        setActiveStep(activeStep + 1);
        setLoading(false);
      } else {
        setSellCarError(sellCarApiCall.data.error);
        // console.log();

        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      let errorResponse = JSON.parse(error?.request?.response);
      console.log(errorResponse?.message);
      setSellCarError(errorResponse?.message);
      setLoading(false);
    }
  };

  // Effects

  useEffect(() => {
    if (steps?.length == activeStep) {
      // This is last step
      setTimeout(() => {
        router.push("/");
        overflowHidden(false);
      }, 15000);
    }
  }, [activeStep]);

  useEffect(() => {
    if (sellCarData) {
      _sellCar(sellCarData);
    }
  }, [sellCarData]);

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
                  <h4 className="success">Hurray!!</h4>
                  <img src={SuccesBookingPng.src} alt="succes booking" />
                  <h4>
                    We shall evaluate and buy your car in the next 24 hours.
                    <br /> Our team will call you soon.
                  </h4>
                  {/* <p>
                    You will be receiving a confirmation on your registered
                    mobile number & email.
                  </p> */}
                  {/* <p>Thanks for choosing Wish Wheels</p> */}
                  <Link href="/car-collection">Explore Collection</Link>
                </div>
              </div>
            ) : (
              <>
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
                      <Alert
                        severity="success"
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
                          success: <GppGoodIcon fontSize="inherit" />,
                        }}
                      >
                        Information provided by you and the transaction of your
                        sale, stays confidential!
                      </Alert>
                      <div
                        style={{
                          position: "relative",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "20px 0 0 auto",
                        }}
                      >
                        <span className="Authentication-error error">
                          {sellCarError}
                        </span>
                        <div className="sell-car-btn">
                          <SiteButton
                            type="submit"
                            disabled={
                              !(props.isValid && props.dirty) || loading
                            }
                            text={loading ? "sending..." : "Done"}
                            arrow={isLastStep ? false : true}
                          />
                        </div>

                        {/* {props.isSubmitting && (
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
                      )} */}
                      </div>
                    </Form>
                  )}
                </Formik>
              </>
            )}
          </Grid>
          <Grid item lg={6} className="order-md-1">
            {/* <MediaQuery query="(max-width: 992px)">
              <StyledStepper activeStep={activeStep} steps={steps} />
            </MediaQuery> */}
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
