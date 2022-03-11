import { Container, Grid } from "@mui/material";
import React, { useContext, useEffect, useState } from "react";
import Link from "next/link";
import {
  FooterWrapper,
  FooterLinkTitle,
  FooterLinkContainer,
} from "./footerElement";
import Image from "next/image";
import Logo from "../../../public/wishwheels-logo.svg";
import InstagramLogo from "../../../public/Instagram.svg";
import TwitterLogo from "../../../public/twitter.svg";
import FacebookLogo from "../../../public/facebook.svg";
import YoutubeLogo from "../../../public/youtube.svg";
import CtaBanner from "../CtaBanner";
import { SocialMediaService } from "../../services/social";
import router from "next/router";
import AuthContext from "../../context/AuthContext";

export default function Footer({
  className,
  ctaTitle,
  ctaAction,
  ctaBtnText,
}: any) {
  // States
  const [socialLinkList, setSocialLinkList] = useState<any>();

  // Variables
  const socialMediaService = new SocialMediaService();

  // Context
  const { authenticated, setAuthenticated } = useContext(AuthContext);

  // Funtions

  const socialMediaLink = () => {
    const socialMediaApiCall = socialMediaService.socialMedia();
    socialMediaApiCall.then((res: any) => {
      if (!res?.data?.error) {
        // console.log(res?.data?.data);
        setSocialLinkList(res?.data?.data);
      }
    });
  };

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

  // Effects
  useEffect(() => {
    socialMediaLink();
  }, []);

  return (
    <div
      className={`${className} d-flex`}
      style={{
        flexDirection: "column",
        justifyContent: "end",
        alignItems: "unset",
      }}
    >
      <CtaBanner
        catTitle={ctaTitle}
        ctaAction={ctaAction}
        ctaText={ctaBtnText}
      />
      <FooterWrapper>
        <Container maxWidth="lg">
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              <div className="footer-logo">
                <img src={Logo.src} alt="" />
                <h3>Wish Wheels</h3>
              </div>
              <h6 className="copy-right-text">Copyright © 2022 Wish Wheels </h6>
              <h6 className="copy-right-text">All rights reserved</h6>
              <div className="social-icons">
                <ul>
                  {socialLinkList &&
                    socialLinkList?.map((item: any, index: number) => (
                      <li key={`link-${item?.title}`}>
                        <a href={item?.link} target="_blank" rel="noreferrer">
                          <Image
                            src={
                              item?.title == "Instagram"
                                ? InstagramLogo
                                : item?.title == "Facebook"
                                ? FacebookLogo
                                : YoutubeLogo
                            }
                            alt={item?.title}
                            width={32}
                            height={32}
                          />
                        </a>
                      </li>
                    ))}
                </ul>
              </div>
            </Grid>
            <Grid item xs={12} md={4}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <FooterLinkTitle>Company</FooterLinkTitle>
                  <FooterLinkContainer>
                    <li>
                      <Link href="/about-us">
                        <a>About Us</a>
                      </Link>
                    </li>
                    <li>
                      <a onClick={sellcar} className="cursor-pointer">
                        Sell car
                      </a>
                    </li>
                    <li>
                      <Link href="/car-collection">
                        <a>Browse Car</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/faq">
                        <a>FAQ</a>
                      </Link>
                    </li>
                  </FooterLinkContainer>
                </Grid>
                <Grid item xs={6}>
                  <FooterLinkTitle>Support</FooterLinkTitle>
                  <FooterLinkContainer>
                    <li>
                      <Link href="/terms-of-service">
                        <a>Terms of service</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/privacy-policy">
                        <a>Privacy policy</a>
                      </Link>
                    </li>
                    <li>
                      <Link href="/contact-us">
                        <a>Contact Us</a>
                      </Link>
                    </li>
                  </FooterLinkContainer>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Container>
      </FooterWrapper>
    </div>
  );
}
