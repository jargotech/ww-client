import React, { useContext } from "react";
import { Container, Grid } from "@mui/material";
import Image from "next/image";
import CreateLogo from "../../public/create.svg";
import Archive from "../../public/archive.png";
import Check from "../../public/check.png";
import Badge from "../../public/badge.png";
import Sold from "../../public/sold.png";
import SiteButton from "./Button";
import { useRouter } from "next/router";
import AuthContext from "../context/AuthContext";

export default function HowItWorks() {
  // States

  // context
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  // Variable

  const router = useRouter();
  const sellcar = () => {
    if (localStorage.getItem("jwt")) {
      setAuthenticated(false);
      router.push({
        pathname: "/sell-car",
      });
    } else {
      setAuthenticated(true);
    }
  };

  // Funtions
  const handleClick = () => {
    router.push("/sell-car");
  };

  // Effects
  return (
    <section className="how-it-works site-section">
      <Container maxWidth="lg">
        <h3>How to sell your car</h3>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3} sx={{ marginBottom: "15px" }}>
            <Image src={Archive} height={64} width={64} alt="createLogo" />
            <h4>Share details</h4>
            <p>Give us details of your car</p>
          </Grid>
          <Grid item xs={12} md={3} sx={{ marginBottom: "15px" }}>
            <Image src={Check} height={64} width={64} alt="createLogo" />
            <h4>Get inspected</h4>
            <p>
              We provide doorstep inspection, our team will inspect within 24
              hours
            </p>
          </Grid>
          <Grid item xs={12} md={3} sx={{ marginBottom: "15px" }}>
            <Image src={Badge} height={64} width={64} alt="createLogo" />
            <h4>Receive offer</h4>
            <p>
              As the team evaluates the value of asset, and reverts back with
              prices.
            </p>
          </Grid>
          <Grid item xs={12} md={3} sx={{ marginBottom: "15px" }}>
            <Image src={Sold} height={64} width={64} alt="createLogo" />
            <h4>Sold</h4>
            <p>We wrap the paperwork and make this a deal all within a day </p>
          </Grid>
          <Grid item xs={12}>
            <div className="floating-btn">
              <SiteButton
                text="Sell Now"
                buttonVariant="primary"
                arrow={false}
                onClick={sellcar}
                styles={{ margin: "0 auto" }}
              />
            </div>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
}
