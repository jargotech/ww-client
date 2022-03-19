import { Container, Grid, Tab, Tabs } from "@mui/material";
import Image from "next/image";
import CarImage from "../public/no-image.png";
import React, { useEffect, useState } from "react";
import { currencyFormatter } from "../src/utils/currecyFormatter";
import { BookTrialService } from "../src/services/bookTrial/bookTrialService";
import { userJwtData } from "../src/utils/getAccessToken";
import moment from "moment";

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

  // variables
  const bookTrialService = new BookTrialService();
  const userData: any = userJwtData() && userJwtData();

  // Functions
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const getAllBookingDetailId = async (payload: any) => {
    try {
      const payloadData = {
        userId: payload,
      };
      const booktrailData = await bookTrialService.getTrailByUserId(
        payloadData
      );
      if (!booktrailData.data.error) {
        setBookingDetailList(booktrailData.data.data);
      }
    } catch (error) {}
  };

  // Effects
  useEffect(() => {
    if (userData) {
      getAllBookingDetailId(userData);
    }
    console.log(userData);
  }, [userData]);

  return (
    <section className="customer-history">
      <Container maxWidth="lg">
        <h3 className="section-title">
          My <span>Transactions</span>
        </h3>
        <div className="customer-history-tab">
          <Tabs
            value={value}
            onChange={handleChange}
            className="authenticationTabs"
          >
            <Tab label="Inspection" />
            <Tab label="Booking" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={4}>
                <div className="car-inpection-card cars-cards">
                  <div className="car-inpection-container">
                    <h4>Brand Model</h4>
                    <Grid container spacing={2} className="car-detail-data">
                      <Grid item xs={4}>
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">
                            Fuel Type
                          </span>
                          <h6 className="readonly-custom-value">Peterol</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-center">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">
                            RC. State
                          </span>
                          <h6 className="readonly-custom-value">Goa</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-right">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">KMS</span>
                          <h6 className="readonly-custom-value">40,000</h6>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className="car-detail-data">
                      <Grid item xs={4}>
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">Year</span>
                          <h6 className="readonly-custom-value">2022</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-center">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">City</span>
                          <h6 className="readonly-custom-value">Panji</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-right">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">Pincode</span>
                          <h6 className="readonly-custom-value">401107</h6>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="created-date d-flex justify-content-between">
                    <span>Created on</span>
                    <span>16 Mar 2022</span>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="car-inpection-card cars-cards">
                  <div className="car-inpection-container">
                    <h4>Brand Model</h4>
                    <Grid container spacing={2} className="car-detail-data">
                      <Grid item xs={4}>
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">
                            Fuel Type
                          </span>
                          <h6 className="readonly-custom-value">Peterol</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-center">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">
                            RC. State
                          </span>
                          <h6 className="readonly-custom-value">Goa</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-right">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">KMS</span>
                          <h6 className="readonly-custom-value">40,000</h6>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className="car-detail-data">
                      <Grid item xs={4}>
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">Year</span>
                          <h6 className="readonly-custom-value">2022</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-center">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">City</span>
                          <h6 className="readonly-custom-value">Panji</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-right">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">Pincode</span>
                          <h6 className="readonly-custom-value">401107</h6>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="created-date d-flex justify-content-between">
                    <span>Created on</span>
                    <span>16 Mar 2022</span>
                  </div>
                </div>
              </Grid>

              <Grid item xs={12} sm={6} md={4}>
                <div className="car-inpection-card cars-cards">
                  <div className="car-inpection-container">
                    <h4>Brand Model</h4>
                    <Grid container spacing={2} className="car-detail-data">
                      <Grid item xs={4}>
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">
                            Fuel Type
                          </span>
                          <h6 className="readonly-custom-value">Peterol</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-center">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">
                            RC. State
                          </span>
                          <h6 className="readonly-custom-value">Goa</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-right">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">KMS</span>
                          <h6 className="readonly-custom-value">40,000</h6>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid container spacing={2} className="car-detail-data">
                      <Grid item xs={4}>
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">Year</span>
                          <h6 className="readonly-custom-value">2022</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-center">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">City</span>
                          <h6 className="readonly-custom-value">Panji</h6>
                        </div>
                      </Grid>
                      <Grid item xs={4} className="text-right">
                        <div className="readonly-custom">
                          <span className="readonly-custom-label">Pincode</span>
                          <h6 className="readonly-custom-value">401107</h6>
                        </div>
                      </Grid>
                    </Grid>
                  </div>
                  <div className="created-date d-flex justify-content-between">
                    <span>Created on</span>
                    <span>16 Mar 2022</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </TabPanel>
          <TabPanel value={value} index={1}>
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
                          <span>Ride Date</span>
                          <span>
                            {moment(item.bookOnDateTime).format(
                              "D MMM YYYY  h:mm a"
                            )}
                          </span>
                        </div>
                        <Image
                          src={CarImage}
                          width={435}
                          height={270}
                          alt="Car"
                        />
                        <div className="content">
                          <h4>2015 USED AUDI A8 W12</h4>
                          <Grid container spacing={2}>
                            <Grid item xs={4}>
                              <p className="car-summary-header">FUEL TYPE </p>
                              <span className="car-summary">Petrol</span>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: "center" }}>
                              <p className="car-summary-header">MODEL</p>
                              <span className="car-summary">2018</span>
                            </Grid>
                            <Grid item xs={4} sx={{ textAlign: "right" }}>
                              <p className="car-summary-header">KMS</p>
                              <span className="car-summary">33423432</span>
                            </Grid>
                          </Grid>
                          <div className="d-flex justify-content-between price-detail">
                            <div className="readonly-custom">
                              <span className="readonly-custom-label">Ask</span>
                              <h6 className="readonly-custom-value">
                                {currencyFormatter("5000000000000")}
                              </h6>
                            </div>
                            <div className="readonly-custom">
                              <span className="readonly-custom-label ">
                                Bid
                              </span>
                              <h6 className="readonly-custom-value primary-color">
                                {currencyFormatter("5000000000000")}
                              </h6>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Grid>
                ))}
            </Grid>
          </TabPanel>
        </div>
      </Container>
    </section>
  );
}
