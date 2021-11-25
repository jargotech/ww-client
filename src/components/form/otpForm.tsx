import { Button, Grid } from '@mui/material';
import React, { Component, ReactDOM } from 'react';
import SiteButton from '../Button';

export default function OtpForm(props: any) {
    const {
        formik

    } = props;
    const inputfocus = (elmnt: any) => {

        if (elmnt.key === "Delete" || elmnt.key === "Backspace") {
            const next = elmnt.target.tabIndex - 2;
            if (next > -1) {

                elmnt.target.parentNode.childNodes[next].focus()
            }
        }
        else {

            const next = elmnt.target.tabIndex;
            if (next < 6) {
                elmnt.target.parentNode.childNodes[next].focus()
            }
        }

    }
    return (
        <div className="otp-wrapper">
            <h6>Enter OTP recived on your mobile and email</h6>
            <div className="otpContainer">
                <input
                    name='otp1'
                    value={formik.values.otp1}
                    onChange={formik.handleChange}
                    type="text"
                    autoComplete="off"
                    className="otpInput"
                    maxLength={1}
                    tabIndex={1}
                    onKeyUp={e => inputfocus(e)}

                />
                <input
                    name='otp2'
                    value={formik.values.otp2}
                    onChange={formik.handleChange}
                    type="text"
                    autoComplete="off"
                    className="otpInput"
                    maxLength={1}
                    tabIndex={2}
                    onKeyUp={e => inputfocus(e)}

                />
                <input
                    name='otp3'
                    value={formik.values.otp3}
                    onChange={formik.handleChange}
                    type="text"
                    autoComplete="off"
                    className="otpInput"
                    maxLength={1}
                    tabIndex={3}
                    onKeyUp={e => inputfocus(e)}

                />
                <input
                    name='otp4'
                    value={formik.values.otp4}
                    onChange={formik.handleChange}
                    type="text"
                    autoComplete="off"
                    className="otpInput"
                    maxLength={1}
                    tabIndex={4}
                    onKeyUp={e => inputfocus(e)}
                />

                <input
                    name='otp5'
                    value={formik.values.otp5}
                    onChange={formik.handleChange}
                    type="text"
                    autoComplete="off"
                    className="otpInput"
                    maxLength={1}
                    tabIndex={5}
                    onKeyUp={e => inputfocus(e)}
                />
                <input
                    name='otp6'
                    value={formik.values.otp6}
                    onChange={formik.handleChange}
                    type="text"
                    autoComplete="off"
                    className="otpInput"
                    maxLength={1}
                    tabIndex={6}
                    onKeyUp={e => inputfocus(e)}
                />
            </div>
            {/* <SiteButton text="Done" styles={{ marginLeft: ' auto', }} /> */}
        </div>

    )
}

