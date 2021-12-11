import { Container, Drawer, Grid, IconButton, styled } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SiteButton from './Button'
import CarCards from './carCards'
import BrandAutoComplete from '../components/BrandAutoComplete'
import DeletableChips from './deletableChips'
import Image from 'next/image'
import BackLogo from '../../public/backArrow.svg'
import { Field, Form, Formik } from 'formik'
import * as CONSTANTS from '../CONSTANTS'


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


export default function CarListing({ allCars }: any) {

    // States
    const [open, setOpen] = useState(false)
    const [registrationYearOptions, setRegistrationYearOptions] = useState<any[]>([])
    const [kmsDrivenOptions, setKmsDrivenOptions] = useState<any[]>([])
    const [budgetOptions, setBudgetOptions] = useState<any[]>([])
    const [bodyOptions, setBodyOptions] = useState<any[]>([])

    // Functions
    const toggleDrawer = (open: boolean) => (event: any) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(open);
    };

    const ClearFilter = () =>{
        console.log('ClearFilters')
    }

    // Effects
    useEffect(() => {
        setRegistrationYearOptions(CONSTANTS.registrationYearList);
        setKmsDrivenOptions(CONSTANTS.kmsDrivenList);
        setBudgetOptions(CONSTANTS.budgetList);
        setBodyOptions(CONSTANTS.bodyList);

    }, []);
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
                        <div className="drawer-header-with-icon">
                            <IconButton onClick={toggleDrawer(false)}>
                                <Image src={BackLogo} alt="Add comment" />
                            </IconButton>
                            <h4>Filters</h4>
                        </div>
                        <Formik
                            initialValues={{
                                registrationYear: '',
                                kmsDriven: [],
                                budget: '',
                                body: '',
                                brands: [],
                            }}
                            onSubmit={async (values) => {
                                const { minYear, maxYear } = (JSON.parse(values.registrationYear)?.dbValue);
                                // alert(`${minYear} - ${maxYear}`);
                                alert(JSON.stringify(values, null, 2));
                            }}
                        >
                            {(formik: any) => (
                                <Form>
                                    <div className="filter">
                                        <h5>Registration Year</h5>
                                        <ul className="filter-list">
                                            {
                                                registrationYearOptions &&

                                                registrationYearOptions.map((year, index) => (
                                                    <li key={index}>
                                                        <Field type="radio" value={JSON.stringify(year)} id={year?.label} name="registrationYear" />
                                                        <label htmlFor={year?.label}>{year?.label}</label>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="filter">
                                        <h5>KMS</h5>
                                        <ul className="filter-list">
                                            {
                                                kmsDrivenOptions &&

                                                kmsDrivenOptions.map((kms, index) => (
                                                    <li key={index}>
                                                        <Field type="checkbox" value={JSON.stringify(kms)} id={kms?.label} name="kmsDriven" />
                                                        <label htmlFor={kms?.label}>{kms?.label}</label>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="filter">
                                        <h5>Budget</h5>
                                        <ul className="filter-list">
                                        {
                                                budgetOptions &&

                                                budgetOptions.map((budget, index) => (
                                                    <li key={index}>
                                                        <Field type="radio" value={JSON.stringify(budget)} id={budget?.label} name="budget" />
                                                        <label htmlFor={budget?.label}>{budget?.label}</label>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                    <div className="filter">
                                        <h5>Body</h5>
                                        <ul className="filter-list">
                                        {
                                                bodyOptions &&

                                                bodyOptions.map((body, index) => (
                                                    <li key={index}>
                                                        <Field type="radio" value={JSON.stringify(body)} id={body?.label} name="body" />
                                                        <label htmlFor={body?.label}>{body?.label}</label>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                        <BrandAutoComplete data={formik} />
                                    </div>
                                    <div className="filter-footer">
                                        <SiteButton text="Clear Filters" onClick={ClearFilter} buttonVariant="secondary" />
                                        <SiteButton type="submit" text="Apply Changes" />
                                    </div>
                                </Form>
                            )}
                        </Formik>

                    </div>
                </StyledDrawer>
                <StyledGrid container rowSpacing={3} spacing={2}>
                    {
                        allCars.map((car: any, index: number) => (
                            <Grid key={index} item sm={6} lg={4}>
                                <CarCards {...car} variant="card2" />
                            </Grid>
                        ))
                    }

                </StyledGrid>
            </Container>
        </section >
    )
}
