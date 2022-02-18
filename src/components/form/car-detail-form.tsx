import { LocalizationProvider, DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { BrandService } from "../../services/cars/brandService";
import { CitiesService } from "../../services/cities/citiesService";
import { StyledAutoComplete, StyledTextField } from "../GlobalElements";

export default function CarDetailForm(props: any) {
  // States
  const [brandList, setBrandList] = useState<any>();
  const [stateList, setStateList] = useState<any>();

  // Variables
  const brandService = new BrandService();
  const cityService = new CitiesService();
  const { formik } = props;

  // Functions
  const _getAllBrandList = () => {
    const brandListApiCall = brandService?.getAllBrandList();
    brandListApiCall.then((res: any) => {
      if (!res?.data?.error) {
        console.log(res?.data?.data);
        setBrandList(res?.data?.data);
      }
    });
  };

  const _getAllState = () => {
    const stateListApiCall = cityService?.getAllStates();
    stateListApiCall.then((res: any) => {
      if (!res?.data?.error) {
        console.log(res?.data?.data);
        setStateList(res?.data?.data);
      }
    });
  };

  // Effects

  useEffect(() => {
    _getAllBrandList();
    _getAllState();
  }, []);

  // Context

  return (
    <div>
      <Grid container spacing={2}>
        <Grid xs={12} item md={6} className="book-trail-form-field">
          <FormControl fullWidth>
            <InputLabel id="brand-lable">Brand</InputLabel>
            <Select
              labelId="brand-lable"
              id="brand-select"
              label="brand"
              name="brandId"
              error={formik.touched.brandId && formik.errors.brandId}
              required
              value={formik.values.brandId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {brandList &&
                brandList.map((item: any, index: number) => (
                  <MenuItem key={`brand-item-${index}`} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
            </Select>
            <span className="error">
              {formik.touched.brandId && formik.errors.brandId}
            </span>
          </FormControl>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field sell-car">
          <StyledTextField
            error
            required
            name="modelId"
            value={formik.values.modelId}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="Model"
            fullWidth
          />
          <span className="error">
            {formik.touched.modelId && formik.errors.modelId}
          </span>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field">
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              views={["year"]}
              label="Manufacture Year"
              value={formik.values.year}
              maxDate={new Date()}
              onChange={(value) => formik.setFieldValue("year", value)}
              renderInput={(params) => (
                <TextField
                  name="year"
                  {...params}
                  helperText={null}
                  fullWidth
                />
              )}
            />
            <span className="error">
              {formik.touched.year && formik.errors.year}
            </span>
          </LocalizationProvider>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field">
          <FormControl fullWidth>
            <InputLabel id="ownership-lable">OwnerShip</InputLabel>
            <Select
              labelId="ownership-lable"
              error={formik.touched.ownerShip && formik.errors.ownerShip}
              required
              id="ownership-select"
              label="ownership"
              name="ownerShip"
              value={formik.values.ownerShip}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="2nd">2nd</MenuItem>
              <MenuItem value="3rd">3rd</MenuItem>
            </Select>
          </FormControl>
          <span className="error">
            {formik.touched.ownerShip && formik.errors.ownerShip}
          </span>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field sell-car">
          <StyledTextField
            error
            required
            name="milege"
            type="number"
            value={formik.values.milege}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="Milage"
            fullWidth
          />
          <span className="error">
            {formik.touched.milege && formik.errors.milege}
          </span>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field">
          <FormControl fullWidth>
            <InputLabel id="fueltype-lable">FuelType</InputLabel>
            <Select
              labelId="fueltype-lable"
              id="fueltype-select"
              error={formik.touched.fuelType && formik.errors.fuelType}
              required
              label="fueltype"
              name="fuelType"
              value={formik.values.fuelType}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              <MenuItem value="petrol">Petrol </MenuItem>
              <MenuItem value="diesel">Diesel</MenuItem>
              <MenuItem value="ev">EVs</MenuItem>
            </Select>
            <span className="error">
              {formik.touched.fuelType && formik.errors.fuelType}
            </span>
          </FormControl>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field sell-car">
          <StyledTextField
            error
            required
            name="kmDriven"
            type="number"
            value={formik.values.kmDriven}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="KM Traveled"
            fullWidth
          />
          <span className="error">
            {formik.touched.kmDriven && formik.errors.kmDriven}
          </span>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field">
          <FormControl fullWidth>
            <InputLabel id="registrationState-lable">
              Registration State
            </InputLabel>
            <Select
              labelId="registrationState-lable"
              id="registrationState-select"
              error={
                formik.touched.registrationStateId &&
                formik.errors.registrationStateId
              }
              required
              label="Registration State"
              name="registrationStateId"
              value={formik.values.registrationStateId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            >
              {stateList &&
                stateList.map((item: any, index: number) => (
                  <MenuItem key={`state-${index}`} value={item?.id}>
                    {item?.name}
                  </MenuItem>
                ))}
            </Select>
            <span className="error">
              {formik.touched.registrationStateId &&
                formik.errors.registrationStateId}
            </span>
          </FormControl>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field sell-car">
          <StyledTextField
            error
            required
            name="pincode"
            type="number"
            value={formik.values.pincode}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="PinCode"
            fullWidth
          />
          <span className="error">
            {formik.touched.pincode && formik.errors.pincode}
          </span>
        </Grid>
        <Grid xs={12} item md={6} className="book-trail-form-field sell-car">
          <StyledTextField
            error
            required
            name="cityName"
            value={formik.values.cityName}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            variant="filled"
            label="City"
            fullWidth
          />
          <span className="error">
            {formik.touched.cityName && formik.errors.cityName}
          </span>
        </Grid>
      </Grid>
    </div>
  );
}
