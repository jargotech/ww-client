import React from 'react';
import { Container, Grid } from '@mui/material';
import Image from 'next/image';
import CreateLogo from '../../public/create.svg'
import Archive from '../../public/archive.png'
import Check from '../../public/check.png'
import Badge from '../../public/badge.png'
import Sold from '../../public/sold.png'

export default function HowItWorks() {
    return (
        <section className="how-it-works site-section">
            <Container maxWidth="lg">
                <h3>How it works</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={3} sx={{ marginBottom: '15px' }}>
                        <Image src={Archive} height={64} width={64} alt="createLogo" />
                        <h4>List your car</h4>
                        <p>You can list your car by filling out a short form, we serve in Mumbai, Pune and Nagpur  </p>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ marginBottom: '15px' }}>
                        <Image src={Check} height={64} width={64} alt="createLogo" />
                        <h4>Inspection</h4>
                        <p>We provide doorstep inspection, our team will inspect within 24 hours</p>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ marginBottom: '15px' }}>
                        <Image src={Badge} height={64} width={64} alt="createLogo" />
                        <h4>Evaluation</h4>
                        <p>As the team evaluates the value of asset, and reverts back with prices.</p>
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ marginBottom: '15px' }}>
                        <Image src={Sold} height={64} width={64} alt="createLogo" />
                        <h4>Deal</h4>
                        <p>We wrap the paperwork and make this a deal all within a day </p>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
