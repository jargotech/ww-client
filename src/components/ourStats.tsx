import { Container, Grid } from "@mui/material";
import moment from "moment";
import React from "react";

export default function OurStats({ serviceCities, numberOfCars }: any) {
  return (
    <section className="site-section d-flex align-items-center">
      <div className="our-stats">
        {serviceCities}
        {numberOfCars}
        <Container maxWidth="lg">
          <h3>Some count that matters</h3>
          <p>Our achievement in the journey depicted in numbers</p>
          <Grid container spacing={2} sx={{ justifyContent: "center" }}>
            <Grid item xs={8} md={3} sx={{ marginBottom: "20px" }}>
              <div className="stats-list">
                {/* <h4>{serviceCities || 0}</h4> */}
                <h4>15+</h4>
                {/* <h4>3</h4> */}
                <p>Service Cities</p>
              </div>
            </Grid>
            <Grid item xs={8} md={3} sx={{ marginBottom: "20px" }}>
              <div className="stats-list">
                {/* <h4>30+</h4> */}
                <h4>{369 + numberOfCars || 0}+</h4>
                <p>Cars</p>
              </div>
            </Grid>
            <Grid item xs={8} md={3} sx={{ marginBottom: "20px" }}>
              <div className="stats-list">
                <h4>500+</h4>
                <p>Customers Served</p>
              </div>
            </Grid>
            <Grid item xs={8} md={3} sx={{ marginBottom: "20px" }}>
              <div className="stats-list">
                <h4>{moment().year() - 2014}</h4>
                <p>Years of Journey</p>
              </div>
            </Grid>
          </Grid>
        </Container>
      </div>
    </section>
  );
}
