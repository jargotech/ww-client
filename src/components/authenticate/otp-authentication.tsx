import { Grid } from "@mui/material";
import { Formik, Form } from "formik";
import React from "react";
import SiteButton from "../Button";
import OtpForm from "../form/otpForm";
import { StyledTextField } from "../GlobalElements";

export default function OtpAuthentication() {
  // States

  // Varialbes
  const initialValues = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
    otp5: "",
    otp6: "",
  };

  // Functions

  // Effects

  return (
    <div>
      {/* <Formik
                initialValues={initialValues}
                // validationSchema={validationSchema}
                onSubmit={handelSubmit}
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
            </Formik> */}
    </div>
  );
}
