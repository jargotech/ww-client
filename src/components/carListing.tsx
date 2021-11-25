import { Container, Drawer, Grid, styled } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SiteButton from './Button'
import CarCards from './carCards'
import BrandAutoComplete from '../components/BrandAutoComplete'
import DeletableChips from './deletableChips'
import { AllCityService } from '../services/carService'


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

    // States
    const [cars, setCars] = useState([1, 2, 4, 5, 6, 7, 8, 9, 10]);
    const [open, setOpen] = useState(false)
    const cityService = new AllCityService();

    // Functions
    const toggleDrawer = (open: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const _getAllCity = () => {
        const data = cityService.getAllCollection();
        data.then((res) => {
            console.log(res);
        })
    }

    useEffect(() => {
        _getAllCity();
    }, [])

    // const _getAllCars = () => {
    //     const data = carService.getAllCollection();

    //     data.then((res) => {
    //         // console.log(res.data);
    //         const filtered = res.data.splice(0, 10);
    //         setCars(filtered);
    //     })
    // console.log(res);
    // }

    // useEffect(() => {
    //     _getAllCars();
    // }, [])

    return (
        <section className="car-listing">
            <Container maxWidth="lg">
                <div className="flex-container">
                    <h3 className="section-title">
                        Our <span>Collection </span>
                    </h3>
                    <SiteButton text="Filter" arrow={true} onClick={toggleDrawer(true)} />
                </div>
                <div>
                    <DeletableChips />
                </div>
                <StyledDrawer
                    anchor="right"
                    open={open}
                    onClose={toggleDrawer(false)}
                >
                    <div className="filter-wrapper">
                        <h4>Filters</h4>
                        <div className="filter">
                            <h5>Registration Year</h5>
                            <ul className="filter-list">
                                <li>
                                    <input type="radio" value="2000-2000" id="2000-2000" name="registration_year" />
                                    <label htmlFor="2000-2000">2000 - 2010</label>
                                </li>
                                <li>
                                    <input type="radio" value="2010-2015" id="2010-2015" name="registration_year" />
                                    <label htmlFor="2010-2015">2010 - 2015</label>
                                </li>
                                <li>
                                    <input type="radio" value="2015-2022" id="2015-2022" name="registration_year" />
                                    <label htmlFor="2015-2022">2015 - 2022</label>
                                </li>
                            </ul>
                        </div>
                        <div className="filter">
                            <h5>KMS</h5>
                            <ul className="filter-list">
                                <li>
                                    <input type="radio" value="0-5000" id="0-5000" name="kms" />
                                    <label htmlFor="0-5000">0 - 5000</label>
                                </li>
                                <li>
                                    <input type="radio" value="5000-10000" id="5000-10000" name="kms" />
                                    <label htmlFor="5000-10000">5000 - 10000</label>
                                </li>
                                <li>
                                    <input type="radio" value="10000-150000" id="10000-150000" name="kms" />
                                    <label htmlFor="10000-150000">10000 - 150000</label>
                                </li>
                            </ul>
                        </div>
                        <div className="filter">
                            <h5>Budget</h5>
                            <ul className="filter-list">
                                <li>
                                    <input type="radio" value="under-50-l" id="under-50-" name="Budget" />
                                    <label htmlFor="under-50-">Under 50 L</label>
                                </li>
                                <li>
                                    <input type="radio" value="50L-1Cr" id="50L-1Cr" name="Budget" />
                                    <label htmlFor="50L-1Cr">50L - 1Cr</label>
                                </li>
                                <li>
                                    <input type="radio" value="1Cr-2Cr" id="1Cr-2Cr" name="Budget" />
                                    <label htmlFor="1Cr-2Cr">1Cr - 2Cr</label>
                                </li>
                            </ul>
                        </div>
                        <div className="filter">
                            <h5>Body</h5>
                            <ul className="filter-list">
                                <li>
                                    <input type="radio" value="suv" id="suv" name="body" />
                                    <label htmlFor="suv">SUV</label>
                                </li>
                                <li>
                                    <input type="radio" value="sedan" id="sedan" name="body" />
                                    <label htmlFor="sedan">Sedan</label>
                                </li>
                                <li>
                                    <input type="radio" value="hatchback" id="hatchback" name="body" />
                                    <label htmlFor="hatchback">HatchBack</label>
                                </li>
                                <li>
                                    <input type="radio" value="convertable" id="convertable" name="body" />
                                    <label htmlFor="convertable">Convertable</label>
                                </li>
                            </ul>
                            <BrandAutoComplete />
                        </div>
                        <div className="filter-footer">
                            <SiteButton text="Clear Filters" buttonVariant="secondary" />
                            <SiteButton text="Apply Changes" />
                        </div>

                    </div>
                </StyledDrawer>
                <StyledGrid container rowSpacing={3} spacing={2}>
                    {
                        cars.map((car: any, index) => (
                            <Grid key={index} item sm={6} lg={4}>
                                <CarCards variant="card2" />
                            </Grid>
                        ))
                    }

                    {/* <Grid item  sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item  sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item  sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item  sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item  sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item  sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid>
                    <Grid item  sm={6} lg={4}>
                        <CarCards variant="card2" />
                    </Grid> */}
                </StyledGrid>
            </Container>
        </section>
    )
}
