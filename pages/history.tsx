import { Container, Grid, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import CarImage from "../public/no-image.png";
import React, { useEffect, useState } from "react";
import { currencyFormatter } from "../src/utils/currecyFormatter";
import { BookTrialService } from "../src/services/bookTrial/bookTrialService";
import { userJwtData } from "../src/utils/getAccessToken";
import moment from "moment";
import { CarService } from "../src/services/cars/carService";

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

export default function History() {
  // States
  const [value, setValue] = useState(0);
  const [bookingDetailList, setBookingDetailList] = useState<any>();
  const [inspectionDetailList, setInpspectionDetailList] = useState<any>();

  // variables
  const bookTrialService = new BookTrialService();
  const userData: any = userJwtData() && userJwtData();
  const carService = new CarService();

  // Functions
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getAllBookingDetailId = async (payload: any) => {
    try {
      const booktrailData = await bookTrialService.getTrailByUserId(payload);
      if (!booktrailData.data.error) {
        setBookingDetailList(booktrailData.data.data);
      }
    } catch (error) {}
  };

  const getInspectionById = async (payload: any) => {
    try {
      const inspectionById = await carService.getInpectionsById(payload);
      if (!inspectionById.data.error) {
        setInpspectionDetailList(inspectionById.data.data);
      }
    } catch (error) {}
  };

  // Effects
  useEffect(() => {
    if (userData) {
      getAllBookingDetailId(userData);
      getInspectionById(userData);
    }
    console.log(userData);
  }, [userData]);

  return (
    <section className="customer-history">
      <Container maxWidth="lg">
        <h3 className="section-title">
          My <span>History</span>
        </h3>
        <div className="customer-history-tab">
          <Tabs
            value={value}
            onChange={handleChange}
            className="authenticationTabs"
          >
            <Tab label="Sale inspection" />
            <Tab label="Purchase Booking" />
          </Tabs>
          <TabPanel value={value} index={0}>
            {inspectionDetailList && inspectionDetailList.length > 0 ? (
              <Grid container spacing={2}>
                {inspectionDetailList &&
                  inspectionDetailList.map((item: any, index: number) => (
                    <Grid item xs={12} sm={6} md={4} key={`inpection-${index}`}>
                      <div className="car-inpection-card cars-cards">
                        <div className="car-inpection-container">
                          <h4>
                            {item.Brand._id == "62322c628d85ac348ad470ac"
                              ? item?.otherName
                              : item.Brand.name}{" "}
                            {item.modelId}
                          </h4>
                          <Grid
                            container
                            spacing={2}
                            className="car-detail-data"
                          >
                            <Grid item xs={4}>
                              <div className="readonly-custom">
                                <span className="readonly-custom-label">
                                  Fuel Type
                                </span>
                                <h6 className="readonly-custom-value">
                                  {item.fuelType}
                                </h6>
                              </div>
                            </Grid>
                            <Grid item xs={4} className="text-center">
                              <div className="readonly-custom">
                                <span className="readonly-custom-label">
                                  RC. State
                                </span>
                                <h6 className="readonly-custom-value">
                                  {item.Registered_State[0].name}
                                </h6>
                              </div>
                            </Grid>
                            <Grid item xs={4} className="text-right">
                              <div className="readonly-custom">
                                <span className="readonly-custom-label">
                                  KMS
                                </span>
                                <h6 className="readonly-custom-value">
                                  {item.kmDriven}
                                </h6>
                              </div>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            spacing={2}
                            className="car-detail-data"
                          >
                            <Grid item xs={4}>
                              <div className="readonly-custom">
                                <span className="readonly-custom-label">
                                  Year
                                </span>
                                <h6 className="readonly-custom-value">
                                  {item.year}
                                </h6>
                              </div>
                            </Grid>
                            <Grid item xs={4} className="text-center">
                              <div className="readonly-custom">
                                <span className="readonly-custom-label">
                                  City
                                </span>
                                <h6 className="readonly-custom-value">
                                  {item.cityName}
                                </h6>
                              </div>
                            </Grid>
                            {item.pincode && (
                              <Grid item xs={4} className="text-right">
                                <div className="readonly-custom">
                                  <span className="readonly-custom-label">
                                    Pincode
                                  </span>
                                  <h6 className="readonly-custom-value">
                                    {item.pincode}
                                  </h6>
                                </div>
                              </Grid>
                            )}
                          </Grid>
                        </div>
                        <div className="created-date d-flex justify-content-between">
                          <span>Created on</span>
                          <span>
                            {moment(item.createdAt).format(
                              "D MMM YYYY  h:mm a"
                            )}
                          </span>
                        </div>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <div className="no-data-available">
                <span>No Data Available</span>
              </div>
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {bookingDetailList && bookingDetailList.length > 0 ? (
              <Grid container spacing={2}>
                {bookingDetailList &&
                  bookingDetailList.map((item: any, index: number) => (
                    <Grid
                      item
                      xs={12}
                      sm={6}
                      md={4}
                      key={`booking-card-${index}`}
                    >
                      <div className="booking-detail-card">
                        <div className="cars-cards">
                          <div className="ride-date d-flex justify-content-between">
                            <span>Trial Date</span>
                            <span>
                              {moment(item.bookOnDateTime).format("D MMM YYYY")}
                            </span>
                          </div>
                          <Image
                            // src={item.Car_Images[0]?.imageLink || CarImage}
                            src={
                              item?.Car_Images?.find(
                                (item: any) => item.imageOrder == 0
                              )?.imageLink || CarImage
                            }
                            width={435}
                            height={270}
                            alt="Car"
                          />
                          <div className="content">
                            <h4>{item.Car_Detail.name}</h4>
                            <Grid container spacing={2}>
                              <Grid item xs={4}>
                                <p className="car-summary-header">FUEL TYPE </p>
                                <span className="car-summary">
                                  {item.Car_Detail.fuelType}
                                </span>
                              </Grid>
                              <Grid item xs={4} sx={{ textAlign: "center" }}>
                                <p className="car-summary-header">YEAR</p>
                                <span className="car-summary">
                                  {item.Car_Detail.year}
                                </span>
                              </Grid>
                              <Grid item xs={4} sx={{ textAlign: "right" }}>
                                <p className="car-summary-header">KMS</p>
                                <span className="car-summary">
                                  {item.Car_Detail.kmDriven}
                                </span>
                              </Grid>
                            </Grid>
                            <div className="d-flex justify-content-between price-detail">
                              <div className="readonly-custom">
                                <span className="readonly-custom-label">
                                  Ask
                                </span>
                                <h6 className="readonly-custom-value fns-18">
                                  {currencyFormatter(item.Car_Detail.maxPrice)}
                                </h6>
                              </div>
                              <div className="readonly-custom">
                                <span className="readonly-custom-label ">
                                  Bid
                                </span>
                                <h6 className="readonly-custom-value primary-color fns-18">
                                  {currencyFormatter(item.requestPrice)}
                                </h6>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Grid>
                  ))}
              </Grid>
            ) : (
              <div className="no-data-available">
                <span>No Data Available</span>
              </div>
            )}
          </TabPanel>
        </div>
      </Container>
    </section>
  );
}
