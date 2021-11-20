import { Container, Grid } from '@mui/material'
import React from 'react'
import CarCards from './carCards'
import { styled } from '@mui/system';
import SiteButton from './Button';

const StyledGrid = styled(Grid)`
@media(max-width:576px){
    justify-content: center !important;
}
`;

export default function LatestArrival() {
    return (
        <section className="latest-arrival">
            <Container maxWidth="lg">
                <div className="flex-container">
                    <h3 className="section-title">
                        Our Latest <span>Arrival</span>
                    </h3>
                    <SiteButton text="SHOW ALL" arrow={true} />
                </div>
                <StyledGrid container rowSpacing={3} spacing={2}>
                    <Grid item sm={6} md={4}>
                        <CarCards />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards />
                    </Grid>
                </StyledGrid>
            </Container>
        </section >
    )
}
