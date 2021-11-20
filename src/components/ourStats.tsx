import { Container, Grid } from '@mui/material'
import React from 'react'

export default function OurStats() {
    return (
        <section className="our-stats">
            <Container maxWidth="lg">
                <h3>Some count that matters</h3>
                <p>Our achievement in the journey depicted in numbers</p>
                <Grid container spacing={2}>
                    <Grid item xs={6} md={3} sx={{ marginBottom: '20px' }}>
                        <div className="stats-list">
                            <h4>3</h4>
                            <p>Service Cities</p>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={3} sx={{ marginBottom: '20px' }}>
                        <div className="stats-list">
                            <h4>30+</h4>
                            <p>Cars</p>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={3} sx={{ marginBottom: '20px' }}>
                        <div className="stats-list">
                            <h4>100</h4>
                            <p>Customers Served</p>
                        </div>
                    </Grid>
                    <Grid item xs={6} md={3} sx={{ marginBottom: '20px' }}>
                        <div className="stats-list">
                            <h4>5</h4>
                            <p>Years of Journey</p>
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
