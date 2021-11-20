import { Container, Grid } from '@mui/material'
import SiteButton from './Button'
import React from 'react'
import Image from 'next/image'
import HeroImage from '../../public/heroImg.png'

export default function LandingSection() {
    return (
        <section className="landign-section">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        <Image src={HeroImage} height={529} width={1117} alt="Landing Image" />
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <div className="position-relative">
                            <h3>Premium Pre-<span>Owned</span> Cars</h3>
                            <p>Don’t deny yourself the pleasure of driving the best premium cars from around the world here and now</p>
                            <SiteButton text="SEE COLLECTION" arrow={true} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
