/* eslint-disable react-hooks/exhaustive-deps */
import { FormHelperText, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import { StyledAutoComplete, StyledTextField } from "../GlobalElements";
import SiteButton from "../Button";
import { ErrorMessage, Field } from "formik";
import { CitiesService } from "../../services/cities/citiesService";
import DateTimePicker from "@mui/lab/DateTimePicker";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import DateAdapter from "@mui/lab/AdapterDateFns";
import DatePicker from "@mui/lab/DatePicker";

export default function UserForm({ formik }: any) {
  // States
  const [cities, setCities] = useState<any>();
  const [value, setValue] = React.useState<Date | null>(null);

  const handleChange = (newValue: Date | null) => {
    setValue(newValue);
  };

  // Variable
  const citiesService = new CitiesService();

  // Functions
  const _getAllCities = () => {
    const citiesList = citiesService.getAllCities();
    citiesList.then((res) => {
      if (res.status == 200) {
        // console.log(res.data.data);

        // #1. Adding the city list in the state
        setCities(res.data.data);
      }
    });
  };
  const checkDateDisabled = (date: any) => {
    let today = new Date();
    return date < today;
  };

  const handleMaxLength = (elmnt: any, length: any) => {
    if (elmnt.target.value.length > length)
      elmnt.target.value = elmnt.target.value.slice(0, length);
  };
  // Effects

  useEffect(() => {
    _getAllCities();
  }, []);
  return (
    <div>
      <Grid container spacing={2}>
        <Grid item xs={12} className="book-trail-form-field">
          <StyledTextField
            required
            name="address1"
            autoComplete={"" + Math.random()}
            error
            multiline
            value={formik.values.address1}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="Address Line 1"
            fullWidth
          />
          <span className="error">
            {formik.touched.address1 && formik.errors.address1}
          </span>
        </Grid>
        <Grid item xs={12} className="book-trail-form-field">
          <StyledTextField
            name="address2"
            multiline
            autoComplete={"" + Math.random()}
            value={formik.values.address2}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="Address Line 2"
            fullWidth
          />
          <span className="error">
            {formik.touched.address2 && formik.errors.address2}
          </span>
        </Grid>
        <Grid item xs={6} md={6} className="book-trail-form-field">
          {/* <StyledAutoComplete
            disablePortal
            freeSolo
            id="city"
            options={cities}
            getOptionLabel={(option: any) => option.name}
            fullWidth={true}
            onChange={(e, value) => {
              // consol e.log(value);
              formik.setFieldValue(
                "city",
                value !== null ? value : formik.initialValues.city
              );
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                inputProps={{
                  ...params.inputProps,
                  autoComplete: "new-password",
                }}
                error
                name="city"
                required
                variant="filled"
                label="City"
              />
            )}
          /> */}
          <StyledTextField
            name="city"
            error
            required
            autoComplete={"" + Math.random()}
            value={formik.values.city}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="City"
            fullWidth
          />
          <span className="error">
            {formik.touched.city && formik.errors.city}
          </span>
        </Grid>
        <Grid item xs={6} md={6} className="book-trail-form-field sell-car">
          <StyledTextField
            name="pincode"
            error
            required
            type="number"
            onInput={(e) => handleMaxLength(e, 6)}
            autoComplete={"" + Math.random()}
            value={formik.values.pincode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="Pincode"
            fullWidth
          />
          <span className="error">
            {formik.touched.pincode && formik.errors.pincode}
          </span>
        </Grid>
        <Grid item xs={6} md={6} className="book-trail-form-field">
          <LocalizationProvider dateAdapter={DateAdapter}>
            <DatePicker
              label="Trial Date"
              className="datePicker"
              // value={value}
              // onChange={(newValue) => {
              //     setValue(newValue);
              // }}
              // format="MM/DD/YYYY hh:00 a"
              views={["day"]}
              inputFormat="yyyy/MM/dd"
              value={formik.values.trailDate}
              shouldDisableDate={checkDateDisabled}
              // onChange={(e, value) => {
              //     // consol e.log(value);
              //     formik.setFieldValue(
              //         "dataTime",
              //         value !== null ? value : formik.initialValues.dataTime
              //     );
              // }}
              onChange={(value) => formik.setFieldValue("trailDate", value)}
              renderInput={(params) => (
                <TextField
                  {...params}
                  error
                  name="trailDate"
                  required
                  variant="filled"
                />
              )}
            />
          </LocalizationProvider>
        </Grid>
      </Grid>
    </div>
  );
}

// const cities = [{
//     name: "Pune",
//     id: 3,
// }, {
//     name: "Mumbai",
//     id: 2
// }, {
//     name: "Navi-Mumbai",
//     id: 1
// }];
