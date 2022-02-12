import { Grid } from "@mui/material";
import { Form, Formik } from "formik";
import React, { useState, useEffect } from "react";
import SiteButton from "../src/components/Button";
import { StyledTextField } from "../src/components/GlobalElements";
import * as Yup from "yup";
import { ContactUsService } from "../src/services/contact-us";

export default function ContactUs() {
  // States
  const [contactUsData, setContactUsData] = useState<any>();
  const [loading, setLoading] = useState<any>();
  const [contactUsError, setContactUsError] = useState<any>();

  // Variables
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
  const initialValues = {
    firstName: "",
    lastName: "",
    emailId: "",
    phoneNumber: "",
    cityName: "",
    query: "",
  };

  const validationSchema = Yup.object().shape({
    firstName: Yup.string()
      .min(2, "To shorts")
      .required("This field can't be blank "),
    lastName: Yup.string(),
    emailId: Yup.string().email().required("This field can't be blank"),
    phoneNumber: Yup.string()
      .matches(phoneRegExp, "Phone number is not valid")
      .required("This field can't be blank"),
    cityName: Yup.string().required("This field can't be blank"),
    query: Yup.string()
      .min(3, "To shorts")
      .required("This field can't be blank"),
  });

  const contactUsService = new ContactUsService();

  // Functions
  const handleSubmit = (values: any, actions: any) => {
    const { firstName, lastName, emailId, phoneNumber, cityName, query } =
      values;
    console.log(values);
    setContactUsData({
      firstName,
      lastName,
      emailId,
      phoneNumber,
      cityName,
      query,
    });
    actions.resetForm();
  };

  const _contactUs = async (payload: any) => {
    setContactUsError(null);
    setLoading(true);
    try {
      const contactUsApiCall = await contactUsService.contactUs(payload);
      if (!contactUsApiCall.data.error) {
        console.log(contactUsApiCall.data.data);
        setLoading(false);
      } else {
        console.log(contactUsApiCall.data.error);
        setContactUsError(contactUsApiCall.data.error);
        setLoading(false);
      }
    } catch (error: any) {
      console.log(error);
      let errorResponse = JSON.parse(error?.request?.response);
      console.log(errorResponse?.message);
      setContactUsError(errorResponse?.message);
      setLoading(false);
    }
  };

  // Effects
  useEffect(() => {
    if (contactUsData) {
      _contactUs(contactUsData);
    }
  }, [contactUsData]);

  return (
    <div className="contact-us-page">
      <div className="contact-us-card">
        <h4>Tell us</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(props: any) => (
            <Form id="sell-car" autoComplete="off" className="car-from">
              <Grid container spacing={2}>
                <Grid
                  item
                  xs={6}
                  md={6}
                  className="book-trail-form-field sell-car"
                >
                  <StyledTextField
                    required
                    name="firstName"
                    autoComplete={"" + Math.random()}
                    error
                    value={props.values.firstName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    variant="filled"
                    label="First Name"
                    fullWidth
                  />
                  <span className="error">
                    {props.touched.firstName && props.errors.firstName}
                  </span>
                </Grid>
                <Grid
                  item
                  xs={6}
                  md={6}
                  className="book-trail-form-field sell-car"
                >
                  <StyledTextField
                    name="lastName"
                    autoComplete={"" + Math.random()}
                    error
                    value={props.values.lastName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    variant="filled"
                    label="Last Name"
                    fullWidth
                  />
                  <span className="error">
                    {props.touched.lastName && props.errors.lastName}
                  </span>
                </Grid>
                <Grid item xs={12} className="book-trail-form-field sell-car">
                  <StyledTextField
                    required
                    name="emailId"
                    autoComplete={"" + Math.random()}
                    error
                    value={props.values.emailId}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    variant="filled"
                    label="Email"
                    fullWidth
                  />
                  <span className="error">
                    {props.touched.emailId && props.errors.emailId}
                  </span>
                </Grid>
                <Grid item xs={12} className="book-trail-form-field sell-car">
                  <StyledTextField
                    required
                    name="phoneNumber"
                    autoComplete={"" + Math.random()}
                    error
                    value={props.values.phoneNumber}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    variant="filled"
                    label="Phone Number"
                    fullWidth
                  />
                  <span className="error">
                    {props.touched.phoneNumber && props.errors.phoneNumber}
                  </span>
                </Grid>
                <Grid item xs={12} className="book-trail-form-field sell-car">
                  <StyledTextField
                    required
                    name="cityName"
                    autoComplete={"" + Math.random()}
                    error
                    value={props.values.cityName}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    variant="filled"
                    label="City Name"
                    fullWidth
                  />
                  <span className="error">
                    {props.touched.cityName && props.errors.cityName}
                  </span>
                </Grid>
                <Grid item xs={12} className="book-trail-form-field sell-car">
                  <StyledTextField
                    required
                    name="query"
                    autoComplete={"" + Math.random()}
                    error
                    value={props.values.query}
                    onChange={props.handleChange}
                    onBlur={props.handleBlur}
                    variant="filled"
                    label="Message"
                    multiline
                    rows={5}
                    fullWidth
                  />
                  <span className="error">
                    {props.touched.query && props.errors.query}
                  </span>
                </Grid>
                <Grid item xs={12} className="book-trail-form-field sell-car">
                  <div className="btn-wrapper">
                    <span className="Authentication-error error">
                      {contactUsError}
                    </span>
                    <SiteButton
                      type="submit"
                      disabled={!(props.isValid && props.dirty) || loading}
                      text={loading ? "Submiting..." : "Submit"}
                    />
                  </div>
                </Grid>
              </Grid>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
