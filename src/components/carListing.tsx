/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Drawer, Grid, IconButton, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import SiteButton from "./Button";
import CarCards from "./carCards";
import BrandAutoComplete from "../components/BrandAutoComplete";
import DeletableChips from "./deletableChips";
import Image from "next/image";
import BackLogo from "../../public/backArrow.svg";
import { Field, Form, Formik } from "formik";
import * as CONSTANTS from "../CONSTANTS";
import { CarFilter } from "../services/cars/carFilter";
import { CarService } from "../services/cars/carService";

const StyledGrid = styled(Grid)`
  @media (max-width: 576px) {
    justify-content: center !important;
  }
`;

const StyledDrawer = styled(Drawer)`
  & .MuiDrawer-paper {
    max-width: 430px !important;
    width: 100% !important;
  }
`;

export default function CarListing({ allCars }: any) {
  // States
  const [open, setOpen] = useState(false);
  const [registrationYearOptions, setRegistrationYearOptions] = useState<any[]>(
    []
  );
  const [kmsDrivenOptions, setKmsDrivenOptions] = useState<any[]>([]);
  const [budgetOptions, setBudgetOptions] = useState<any[]>([]);
  const [bodyOptions, setBodyOptions] = useState<any[]>([]);
  const [filterData, setFilterData] = useState<any>();
  const [brandList, setBrandList] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [rawData, setRawData] = useState<any>();

  // Variables
  const carFilterService = new CarFilter();
  const _allBrandService = new CarService();
  const filterInitialValue = {
    registrationYear: "",
    kmsDriven: "",
    budget: "",
    bodyType: "",
    brands: [],
  };

  // Functions

  const toggleDrawer = (currentDrawerState: boolean) => (event: any) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setOpen(currentDrawerState);
  };

  const handleReset = (form: any) => {
    console.log(form);
    form.resetForm();
    // setOpen(false);
  };

  const handleSubmit = (values: any) => {
    const { registrationYear, budget, bodyType, brands, kmsDriven } = values;
    let brandlist: any[] = [];
    let minYear;
    let maxYear;
    let minBudget;
    let maxBudget;
    let body;
    let minKm;
    let maxKm;

    if (registrationYear) {
      minYear = JSON.parse(registrationYear)?.dbValue?.minYear;
      maxYear = JSON.parse(registrationYear)?.dbValue?.maxYear;
    }
    if (kmsDriven) {
      minKm = JSON.parse(kmsDriven)?.dbValue?.minKm;
      maxKm = JSON.parse(kmsDriven)?.dbValue?.maxKm;
    }

    if (budget) {
      const tupleData = JSON.parse(budget)?.dbValue;
      minBudget = tupleData?.minBudget;
      maxBudget = tupleData.maxBudget;
    }

    if (bodyType) {
      body = JSON.parse(bodyType)?.value;
    }
    if (brands) {
      brandlist = brands;
    }

    const convertedFilterValue = {
      minYear: minYear,
      maxYear: maxYear,
      minKm: minKm,
      maxKm: maxKm,
      minBudget: minBudget,
      maxBudget: maxBudget,
      body: body,
      brand: brandlist,
      // "brand": brandlist?.length > 0 ? brandlist : undefined,
    };
    // console.log(convertedFilterValue);

    setFilterData(convertedFilterValue);
    setRawData(values);
  };

  const _postFilter = (data: any) => {
    setIsLoading(true);
    const postFilterList = carFilterService.postAllFilter(data);
    postFilterList.then((res) => {
      setIsLoading(false);
      // console.log(res.data);
      setOpen(false);
    });
  };

  // API Calls
  const _getAllBrands = () => {
    const brands = _allBrandService.getAllBrands();
    brands.then((res) => {
      if (res.status == 200) {
        // console.log(res.data.data)
        // #1. Add the data to the brand list
        const data = res?.data?.data;
        setBrandList(data);
      }
    });
  };
  // Effects
  useEffect(() => {
    setRegistrationYearOptions(CONSTANTS.registrationYearList);
    setKmsDrivenOptions(CONSTANTS.kmsDrivenList);
    setBudgetOptions(CONSTANTS.budgetList);
    setBodyOptions(CONSTANTS.bodyList);
    _getAllBrands();
  }, []);

  // useEffect(() => {
  //     if (filterData) {
  //         _postFilter(filterData);

  //     }

  //     // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [filterData]);

  //   useEffect(() => {
  //     if (rawData) {
  //       // Storing the form value to local storage
  //       localStorage.setItem("filterRawData", JSON.stringify(rawData));
  //     }
  //   }, [rawData]);
  return (
    <section className="car-listing">
      <Container maxWidth="lg">
        <div className="flex-container">
          <h3 className="section-title">
            {/* Our <span>Collection </span> */}
            Current <span>Stock</span>
          </h3>
          {/* <SiteButton text="Filter" arrow={true} onClick={toggleDrawer(true)} /> */}
        </div>
        {/* <div>
          <DeletableChips rawData={rawData} />
        </div> */}
        {/* <StyledDrawer anchor="right" open={open} onClose={toggleDrawer(false)}>
          <div className="filter-wrapper">
            <div className="drawer-header-with-icon">
              <IconButton onClick={toggleDrawer(false)}>
                <Image src={BackLogo} alt="Add comment" />
              </IconButton>
              <h4>Filters</h4>
            </div>
            <Formik
              initialValues={filterInitialValue}
              onSubmit={async (values) => {
                handleSubmit(values);
              }}
            >
              {(formik: any) => (
                <Form>
                  <div className="filter">
                    <h5>Registration Year</h5>
                    <ul className="filter-list">
                      {registrationYearOptions &&
                        registrationYearOptions.map((year, index) => (
                          <li key={index}>
                            <Field
                              type="radio"
                              value={JSON.stringify(year)}
                              id={year?.label}
                              name="registrationYear"
                            />
                            <label htmlFor={year?.label}>{year?.label}</label>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="filter">
                    <h5>KMS</h5>
                    <ul className="filter-list">
                      {kmsDrivenOptions &&
                        kmsDrivenOptions.map((kms, index) => (
                          <li key={index}>
                            <Field
                              type="radio"
                              value={JSON.stringify(kms)}
                              id={kms?.label}
                              name="kmsDriven"
                            />
                            <label htmlFor={kms?.label}>{kms?.label}</label>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="filter">
                    <h5>Budget</h5>
                    <ul className="filter-list">
                      {budgetOptions &&
                        budgetOptions.map((budget, index) => (
                          <li key={index}>
                            <Field
                              type="radio"
                              value={JSON.stringify(budget)}
                              id={budget?.label}
                              name="budget"
                            />
                            <label htmlFor={budget?.label}>
                              {budget?.label}
                            </label>
                          </li>
                        ))}
                    </ul>
                  </div>
                  <div className="filter">
                    <h5>Body</h5>
                    <ul className="filter-list">
                      {bodyOptions &&
                        bodyOptions.map((body, index) => (
                          <li key={index}>
                            <Field
                              type="radio"
                              value={JSON.stringify(body)}
                              id={body?.label}
                              name="bodyType"
                            />
                            <label htmlFor={body?.label}>{body?.label}</label>
                          </li>
                        ))}
                    </ul>
                    <BrandAutoComplete
                      formikData={formik}
                      apiData={brandList}
                    />
                  </div>
                  <div className="filter-footer">
                    <SiteButton
                      text="Clear Filters"
                      // onClick={handleReset.bind(null, formik)}
                      onClick={() => handleReset(formik)}
                      type="button"
                      buttonVariant="secondary"
                    />
                    <SiteButton
                      type="submit"
                      disabled={isLoading}
                      text={isLoading ? "Loading..." : "Apply Changes"}
                    />
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </StyledDrawer> */}
        <StyledGrid container rowSpacing={3} spacing={2}>
          {allCars
            ?.sort(function (a: any, b: any) {
              return a.Car_Detail.carOrder - b.Car_Detail.carOrder;
            })
            .map((car: any, index: number) => (
              <Grid key={index} item sm={6} lg={4}>
                <CarCards {...car} variant="card2" />
              </Grid>
            ))}
        </StyledGrid>
      </Container>
    </section>
  );
}
