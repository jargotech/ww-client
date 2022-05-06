/* eslint-disable react-hooks/exhaustive-deps */
import { DateTimePicker, LocalizationProvider, TabPanelProps } from "@mui/lab";
import { Tabs, Tab, Box, Typography, Grid, TextField } from "@mui/material";
import { Formik, Form } from "formik";
import React, { useState, useEffect } from "react";
import { StyledAutoComplete, StyledTextField } from "../GlobalElements";
import * as Yup from "yup";
import SiteButton from "../Button";
import OtpForm from "../form/otpForm";
import { boolean } from "yup/lib/locale";

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
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function Authenticate({
  generateOtp,
  verifyOtp,
  authenticationError,
  setAuthenticationError,
  loading,
  userSignUp,
  otpModal,
  sendOtp,
}: any) {
  // States
  const [value, setValue] = useState(0);
  const [loggedInData, setLoggedInData] = useState<any>();
  // const [otpModal, setOptModal] = useState(false);
  const [otpData, setOtpData] = useState<any>();
  const [signInError, setSignInError] = useState<any>(true);
  const [signUpData, setSignData] = useState<any>();

  // Variable
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  const emailRegExp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const validationSchema1 = Yup.object().shape({
    userData: Yup.string().required("phone number or Email  is required"),
  });
  const validationSchema2 = Yup.object().shape({
    firstName: Yup.string().required("Field cannot be blank"),
    lastName: Yup.string(),
    emailId: Yup.string(),
    phoneNumber: Yup.string().required("Field cannot be blank"),
  });
  const validationSchema3 = Yup.object().shape({
    otp1: Yup.number().required(),
    otp2: Yup.number().required(),
    otp3: Yup.number().required(),
    otp4: Yup.number().required(),
    otp5: Yup.number().required(),
    otp6: Yup.number().required(),
  });

  const initialValues1 = {
    userData: "",
  };
  const initialValues2 = {
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
  };

  const initialValues3 = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  // Functions
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
    setAuthenticationError(null);
  };

  const signInHandelSubmit = (values: any, { resetForm }: any) => {
    // console.log(values);
    setAuthenticationError(null);
    setLoggedInData(values);

    // handleOtpOpen();
    // setLoading(true);
    setTimeout(function () {
      resetForm();
    }, 1500);
  };
  const signUpHandelSubmit = (values: any, { resetForm }: any) => {
    setAuthenticationError(null);
    console.log(values);
    let { firstName, lastName, emailId, phoneNumber } = values;
    let payload = emailId
      ? {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          phoneNumber: phoneNumber,
        }
      : {
          firstName: firstName,
          lastName: lastName,
          phoneNumber: phoneNumber,
        };
    setSignData(payload);
    setTimeout(function () {
      resetForm();
    }, 1500);
  };

  const otpHandelSubmit = (values: any, { resetForm }: any) => {
    setAuthenticationError(null);
    console.log(values);
    const otp = `
            ${values.otp1}${values.otp2}${values.otp3}${values.otp4}${values.otp5}${values.otp6}
            `;
    setOtpData(otp.toString().replaceAll(/\s/g, ""));
    setTimeout(function () {
      resetForm();
    }, 1500);
  };

  const sendOtpCaller = () => {
    setLoggedInData({
      userData: signUpData?.phoneNumber,
    });
    // console.log("bad it is working of the loading");
  };

  // const handleOtpOpen = () => setOptModal(true);
  // const handleOtpClose = () => setOptModal(false);

  // Effects

  useEffect(() => {
    if (loggedInData) {
      generateOtp(loggedInData);
    }
  }, [loggedInData]);

  useEffect(() => {
    if (signUpData) {
      userSignUp(signUpData);
    }
  }, [signUpData]);

  useEffect(() => {
    if (otpData) {
      verifyOtp(otpData, loggedInData);
    }
  }, [otpData]);

  useEffect(() => {
    if (sendOtp) {
      sendOtpCaller();
    }
  }, [sendOtp]);

  return (
    <>
      {otpModal && otpModal ? (
        <div className="authentication-otp-form">
          <Formik
            initialValues={initialValues3}
            validationSchema={validationSchema3}
            onSubmit={otpHandelSubmit}
          >
            {(formik) => (
              <Form autoComplete="off">
                <div className="otp-authentication-wrapper">
                  <div>
                    <OtpForm formik={formik} />
                    <div className="btn-wrapper d-flex">
                      <span className="Authentication-error error">
                        {authenticationError}
                      </span>
                      {/* Change Number? */}
                      <SiteButton
                        type="submit"
                        text={loading ? "Verifying..." : "Verify"}
                        styles={{ marginLeft: "auto" }}
                        disabled={!(formik.isValid && formik.dirty) || loading}
                        arrow={false}
                      />
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      ) : (
        <div className="authentication-user-form">
          <Tabs
            value={value}
            onChange={handleChange}
            className="authenticationTabs"
          >
            <Tab label="Sign In" />
            <Tab label="Sign Up" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Formik
              initialValues={initialValues1}
              validationSchema={validationSchema1}
              onSubmit={signInHandelSubmit}
            >
              {(formik) => (
                <Form autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid item xs={12} className="authentication-form-field">
                      <StyledTextField
                        autoComplete={"" + Math.random()}
                        name="userData"
                        value={formik.values.userData}
                        onChange={(event: any) => {
                          formik.handleChange(event);
                          // console.log(event.target.value);
                          if (
                            event.target.value > 3 &&
                            /\d/.test(event.target.value)
                          ) {
                            if (phoneRegExp.test(event.target.value)) {
                              setSignInError(false);
                            } else {
                              setSignInError(true);
                            }
                            // phoneRegExp.test(event.target.value)
                          } else {
                            if (emailRegExp.test(event.target.value)) {
                              setSignInError(false);
                            } else {
                              setSignInError(true);
                            }
                          }
                        }}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        error
                        label="Phone number or Email"
                        // helperText={formik.touched.firstName && formik.errors.firstName}
                        fullWidth
                      />
                    </Grid>
                  </Grid>
                  <div className="btn-wrapper d-flex">
                    <span className="Authentication-error error">
                      {authenticationError}
                    </span>
                    <SiteButton
                      type="submit"
                      disabled={
                        signInError ||
                        loading ||
                        !(formik.isValid && formik.dirty)
                      }
                      text={loading ? "Signing..." : "Sign In"}
                      styles={{ marginLeft: "auto" }}
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
              onSubmit={signUpHandelSubmit}
            >
              {(formik) => (
                <Form autoComplete="off">
                  <Grid container spacing={2}>
                    <Grid
                      item
                      xs={6}
                      md={6}
                      className="authentication-form-field"
                    >
                      <StyledTextField
                        required
                        autoComplete={"" + Math.random()}
                        name="firstName"
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        error
                        label="First Name"
                        // helperText={formik.touched.firstName && formik.errors.firstName}
                        fullWidth
                      />
                      <span className="error">
                        {formik.touched.firstName && formik.errors.firstName}
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={6}
                      className="authentication-form-field"
                    >
                      <StyledTextField
                        name="lastName"
                        autoComplete={"" + Math.random()}
                        value={formik.values.lastName}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label="Last Name"
                        fullWidth
                      />
                      <span className="error">
                        {formik.errors.lastName && formik.touched.lastName
                          ? formik.errors.lastName
                          : null}
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={6}
                      className="authentication-form-field"
                    >
                      <StyledTextField
                        required
                        name="phoneNumber"
                        autoComplete={"" + Math.random()}
                        error
                        value={formik.values.phoneNumber}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label="Mobile"
                        fullWidth
                      />
                      <span className="error">
                        {formik.touched.phoneNumber &&
                          formik.errors.phoneNumber}
                      </span>
                    </Grid>
                    <Grid
                      item
                      xs={6}
                      md={6}
                      className="authentication-form-field"
                    >
                      <StyledTextField
                        autoComplete={"" + Math.random()}
                        name="emailId"
                        error
                        value={formik.values.emailId}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        variant="filled"
                        label="Email"
                        fullWidth
                      />
                      <span className="error">
                        {formik.touched.emailId && formik.errors.emailId}
                      </span>
                    </Grid>
                  </Grid>
                  <div className="btn-wrapper d-flex">
                    <span className="Authentication-error error">
                      {authenticationError}
                    </span>
                    <SiteButton
                      type="submit"
                      text={loading ? "Signing..." : "Sign Up"}
                      styles={{ marginLeft: "auto" }}
                      disabled={!(formik.isValid && formik.dirty) || loading}
                      arrow={false}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </TabPanel>
        </div>
      )}
    </>
  );
}
