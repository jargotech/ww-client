import React from 'react';
import { Container, Grid } from '@mui/material';
import Image from 'next/image';
import CreateLogo from '../../public/create.svg'

export default function HowItWorks() {
    return (
        <section className="how-it-works site-section">
            <Container maxWidth="lg">
                <h3>How it works</h3>
                <Grid container spacing={2}>
                    <Grid item xs={12} md={4} sx={{ marginBottom: '15px' }}>
                        {/* <Image src={CreateLogo} height={160} width={200} alt="createLogo" /> */}
                        <h4>List your car</h4>
                        <p>You can list your car by filling out a short form, we serve in Mumbai, Pune and Nagpur  </p>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ marginBottom: '15px' }}>
                        {/* <Image src={CreateLogo} height={160} width={200} alt="createLogo" /> */}
                        <h4>Inspection</h4>
                        <p>We provide doorstep inspection, our team will inspect within 24 hours</p>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ marginBottom: '15px' }}>
                        {/* <Image src={CreateLogo} height={160} width={200} alt="createLogo" /> */}
                        <h4>Evaluation</h4>
                        <p>As the team evaluates the value of asset, and reverts back with prices.</p>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
