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
                        <Image src={CreateLogo} height={160} width={200} alt="createLogo" />
                        <h4>Browse our Collection</h4>
                        <p>Create an account to get started.</p>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ marginBottom: '15px' }}>
                        <Image src={CreateLogo} height={160} width={200} alt="createLogo" />
                        <h4>Browse our Collection</h4>
                        <p>Create an account to get started.</p>
                    </Grid>
                    <Grid item xs={12} md={4} sx={{ marginBottom: '15px' }}>
                        <Image src={CreateLogo} height={160} width={200} alt="createLogo" />
                        <h4>Browse our Collection</h4>
                        <p>Create an account to get started.</p>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
