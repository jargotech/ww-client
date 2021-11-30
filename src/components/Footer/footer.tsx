import { Container, Grid } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { FooterWrapper, FooterLinkTitle, FooterLinkContainer } from './footerElement'
import Image from 'next/image'
import Logo from '../../../public/wishwheels-logo.svg'
import InstagramLogo from '../../../public/Instagram.svg'
import TwitterLogo from '../../../public/twitter.svg'
import YoutubeLogo from '../../../public/youtube.svg'
import CtaBanner from '../CtaBanner'

export default function Footer({ className }: any) {
    return (
        <div className={`${className} d-flex`} style={{ flexDirection: 'column', justifyContent: 'end', alignItems: 'unset' }}>
            <CtaBanner />
            <FooterWrapper>
                <Container maxWidth="lg">
                    <Grid container spacing={2}>
                        <Grid item xs={12} md={8}>
                            <div className="footer-logo">
                                <img src={Logo.src} alt="" />
                                <h3>Wish Wheels</h3>
                            </div>
                            <h6 className="copy-right-text">Copyright © 2021 WishWheels.Inc  </h6>
                            <h6 className="copy-right-text">All rights reserved</h6>
                            <div className="social-icons">
                                <ul>
                                    <li>
                                        <a href="">
                                            <Image
                                                src={InstagramLogo}
                                                alt="Instagram Logo"
                                                width={32}
                                                height={32}
                                            />
                                        </a>

                                    </li>
                                    <li>
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
                                    </li>
                                </ul>
                            </div>
                        </Grid>
                        <Grid item xs={12} md={4}>
                            <Grid container spacing={2}>
                                <Grid item xs={6}>
                                    <FooterLinkTitle>Company</FooterLinkTitle>
                                    <FooterLinkContainer>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>About Page</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>Sell car</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>Talk to us</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>FAQ</a>
                                            </Link>
                                        </li>
                                    </FooterLinkContainer>
                                </Grid>
                                <Grid item xs={6}>
                                    <FooterLinkTitle>Support</FooterLinkTitle>
                                    <FooterLinkContainer>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>Help center</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>Terms of service</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>Legal</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>Privacy policy</a>
                                            </Link>
                                        </li>
                                        <li>
                                            <Link href="/car-listing">
                                                <a>Status</a>
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

    )
}
