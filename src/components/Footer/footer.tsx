import { Container, Grid } from '@mui/material'
import React from 'react'
import Link from 'next/link'
import { FooterWrapper, FooterLinkTitle,FooterLinkContainer } from './footerElement'

export default function Footer() {
    return (
        <FooterWrapper>
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={8}>
                    </Grid>
                    <Grid item xs={4}>
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
                </Grid>
            </Container>
        </FooterWrapper>
    )
}
