import { Container, Drawer, Grid, styled } from '@mui/material'
import React from 'react'
import SiteButton from './Button'
import CarCards from './carCards'


const StyledGrid = styled(Grid)`
@media(max-width:576px){
    justify-content: center !important;
}
`;

const StyledDrawer = styled(Drawer)`
    & .MuiDrawer-paper{
        max-width:430px !important;
        width:100% !important;
    }

`;


export default function CarListing() {
    const [open, setOpen] = React.useState(false)

    const toggleDrawer = (open: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    return (
        <section className="car-listing">
            <Container maxWidth="lg">
                <div className="flex-container">
                    <h3 className="section-title">
                        Our <span>Collection </span>
                    </h3>
                    <SiteButton text="Filter" arrow={true} onClick={toggleDrawer(true)} />
                </div>
                <StyledDrawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    <div className="filter-wrapper">
                        <h4>Filters</h4>
                    </div>
                </StyledDrawer>
                <StyledGrid container rowSpacing={3} spacing={2}>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards variant="card2" />
                    </Grid>
                </StyledGrid>
            </Container>
        </section>
    )
}
