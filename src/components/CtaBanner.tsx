import React from "react";
import { Container, Grid } from "@mui/material";
import SiteButton from "./Button";
import Image from "next/image";
import KeyImage from "../../public/keychain.png";
import { useRouter } from "next/router";

interface ctaType {
  catTitle?: any;
  ctaAction?: any;
  ctaText?: string;
}
export default function CtaBanner({ catTitle, ctaAction, ctaText }: ctaType) {
  return (
    <section>
      <div className="cta-banner">
        <Container maxWidth="lg">
          <h3>A car for every purse and purpose.</h3>
          {/* <Image src={KeyImage} height={240} width={230} alt="keyImage" /> */}
        </Container>
      </div>
    </section>
  );
}
