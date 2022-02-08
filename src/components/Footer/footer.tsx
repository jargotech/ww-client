import { Container, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
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
              <h6 className="copy-right-text">
                Copyright © 2021 WishWheels.Inc{" "}
              </h6>
              <h6 className="copy-right-text">All rights reserved</h6>
              <div className="social-icons">
                <ul>
                  {socialLinkList &&
                    socialLinkList?.map((item: any, index: number) => (
                      <li key={`link-${item?.title}`}>
                        <a href={item?.link}>
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

                  {/* <li>
                    <a href="">
                      <Image
                        src={TwitterLogo}
                        alt="Twitter Logo"
                        width={32}
                        height={32}
                      />
                    </a>
                  </li>
                  <li>
                    <a href="">
                      <Image
                        src={YoutubeLogo}
                        alt="Youtube"
                        width={32}
                        height={32}
                      />
                    </a>
                  </li> */}
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
                      <Link href="/sell-car">
                        <a>Sell car</a>
                      </Link>
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
                    {/* <li>
                      <Link href="/car-listing">
                        <a>Help center</a>
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/terms-of-service">
                        <a>Terms of service</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/car-listing">
                        <a>Legal</a>
                      </Link>
                    </li> */}
                    <li>
                      <Link href="/privacy-policy">
                        <a>Privacy policy</a>
                      </Link>
                    </li>
                    {/* <li>
                      <Link href="/car-listing">
                        <a>Status</a>
                      </Link>
                    </li> */}
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
