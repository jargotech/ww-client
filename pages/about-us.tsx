import { Container, Grid } from "@mui/material";
import React from "react";
import Image from "next/image";
import AboutImage1 from "../public/about-us-img1.svg";
import Car from "../public/car.svg";
import Care from "../public/care.svg";
import Client from "../public/client.svg";
import WhatWeDo from "../public/what-we-do.svg";
import HowWeDo from "../public/how-we-do.svg";
// import BackToBak from "../public/back-to-back.gif";
import HighFive from "../public/high-five.gif";
import WebinerImg from "../public/webinar.gif";

export default function AboutUs() {
  return (
    <>
      <section className="section-about-us about-us-page site-section">
        <Container maxWidth="lg">
          <h3 className="d-block d-md-none">About Us</h3>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6} className="align-self-center ">
              <h3 className="d-none d-md-block">About Us</h3>
              <p>
                We’re one of the leading Pre-owned luxury car dealers in the
                country. Started in the year 2014 by our founder Raghib Khan,
                Wish Wheels is committed to be buying and selling fine cars with
                genuine mileage and history. We are focused to create an
                atmosphere of an increase in luxury and super luxury car owners
                throughout the nation. We are here to serve a niche of clients
                and help them come close to the wheels they have always wished
                for.
              </p>
            </Grid>
            <Grid item xs={12} sm={6} className="text-right">
              <div className="img-wrapper">
                <Image
                  loading="lazy"
                  src={HighFive}
                  width={500}
                  height={480}
                  alt="About us img1"
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className="what-matter-to-us about-us-page site-section">
        <Container maxWidth="lg">
          <h4 className="section-title text-center">What matters to us ?</h4>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <div className="three-c-wrapper">
                <Image
                  loading="lazy"
                  src={Client}
                  width={335}
                  height={290}
                  alt="car"
                />
                <h5>Client</h5>
              </div>
            </Grid>
            <Grid item xs={12} sm={4}>
              <div className="three-c-wrapper">
                <Image
                  loading="lazy"
                  src={Car}
                  width={335}
                  height={290}
                  alt="car"
                />
                <h5>car</h5>
              </div>
            </Grid>

            <Grid item xs={12} sm={4}>
              <div className="three-c-wrapper">
                <Image
                  loading="lazy"
                  src={Care}
                  width={335}
                  height={290}
                  alt="car"
                />
                <h5>Care</h5>
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className="section-what-we-do about-us-page site-section">
        <Container maxWidth="lg">
          <h4 className="section-title">What we do ?</h4>
          <Grid container spacing={2}>
            <Grid item xs={12} md={6}>
              <div className="img-wrapper">
                <Image
                  loading="lazy"
                  src={WhatWeDo}
                  width={615}
                  height={335}
                  alt="what we do"
                />
              </div>
            </Grid>
            <Grid item xs={12} md={6} className=" d-flex align-item-center">
              <p>
                We sell top notch, luxury pre-owned cars in return of
                unparalleled emotions and unforgettable memories. Our method of
                procuring a car, viz. buying car from a customer is so easy and
                hassle free that it makes us stand ahead of most of our
                contemporaries. Similarly our sales are equally smooth hence
                customer’s don’t mind feel lagged and dragged while booking a
                vehicle from us.
              </p>
            </Grid>
          </Grid>
        </Container>
      </section>
      <section className="section-how-we-do about-us-page site-section">
        <Container maxWidth="lg">
          <h4 className="section-title">How we do it ?</h4>
          <Grid container spacing={2}>
            <Grid
              item
              xs={12}
              md={6}
              className=" d-flex align-item-center order-1 order-md-2"
            >
              <p>
                Now that’s a trade secret eh ! Well, thus industry has been a
                very unorganised sector write from its inception and hence it is
                yet to be nationally acknowledged as a proper business by the
                governing bodies.However we’re committed to make it as corporate
                and as formal as possible, since keeping our transactions legal
                and clean is the only way forward.
              </p>
            </Grid>
            <Grid item xs={12} md={6} className="text-right order-2 order-md-1">
              <div className="img-wrapper">
                <Image
                  loading="lazy"
                  src={HowWeDo}
                  width={405}
                  height={277}
                  alt="what we do"
                />
              </div>
            </Grid>
          </Grid>
        </Container>
      </section>
    </>
  );
}
