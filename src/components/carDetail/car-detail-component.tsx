import { Accordion, AccordionDetails, AccordionSummary, Container, Grid, IconButton } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import CarImage from '../../../public/car-img.png'
import AccordionIcon from '../../../public/accordian-icon.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SiteButton from '../Button'
import MakeOfferCta from '../makeOfferCta'

export default function CarDetailComponent() {
    const [displayToggle, setDisplayToggle] = useState(false);
    const [expanded, setExpanded] = React.useState<string | false>('panel1');

    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const toggleDisplay = () => {
        setDisplayToggle(!displayToggle);
    }

    return (
        <section className="car-detail">
            <Container maxWidth="lg">
                <h3>Car Tittle </h3>
                <Grid container spacing={2} sx={{ justifyContent: 'center !important' }}>
                    <Grid item xs={12} md={6} className="order-md-2">
                        <div className="flex-container">
                            <h6>Summary</h6>

                            <IconButton aria-label="toggler" onClick={toggleDisplay} >
                                <Image src={AccordionIcon} alt="accordian" height={30} width={30} />
                            </IconButton>
                        </div>
                        {
                            displayToggle
                                ?
                                (
                                    <div className="car-detail-container">
                                        <div className="car-details-info">
                                            <div className="car-info">
                                                <h6>FUEL TYPE </h6>
                                                <p>PETROL</p>
                                            </div>
                                            <div className="car-info">
                                                <h6>MODEL </h6>
                                                <p>2015
                                                </p>
                                            </div>
                                            <div className="car-info">
                                                <h6>KMS </h6>
                                                <p>40,000</p>
                                            </div>
                                            <div className="car-info">
                                                <h6>Color </h6>
                                                <p>Navy Blue</p>
                                            </div>

                                        </div>
                                        <div className="car-details-info">
                                            <div className="car-info">
                                                <h6>Seating Capacity </h6>
                                                <p>4</p>
                                            </div>
                                            <div className="car-info">
                                                <h6>Transmition </h6>
                                                <p>Automatic
                                                </p>
                                            </div>
                                            <div className="car-info">
                                                <h6>KMS</h6>
                                                <p>40,000</p>
                                            </div>

                                        </div>
                                        <div className="car-details-info">
                                            <div className="car-info">
                                                <h6>FUEL TYPE </h6>
                                                <p>PETROL</p>
                                            </div>
                                            <div className="car-info">
                                                <h6>MODEL </h6>
                                                <p>2015
                                                </p>
                                            </div>
                                            <div className="car-info">
                                                <h6>KMS</h6>
                                                <p>40,000</p>
                                            </div>

                                        </div>

                                    </div>
                                )
                                :
                                (
                                    <div className="accordion-wrapper">
                                        <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <h5>Exterior</h5>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="accordion-content">
                                                    <table>
                                                        <tr>
                                                            <th>Seating Capacity</th>
                                                            <td>4</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Transmition</th>
                                                            <td>Auto</td>
                                                        </tr>
                                                        <tr>
                                                            <th>KMS</th>
                                                            <td>40,000</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <h5>Interior</h5>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="accordion-content">
                                                    <table>
                                                        <tr>
                                                            <th>Seating Capacity</th>
                                                            <td>4</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Transmition</th>
                                                            <td>Auto</td>
                                                        </tr>
                                                        <tr>
                                                            <th>KMS</th>
                                                            <td>40,000</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                        <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                                <h5>Hood</h5>
                                            </AccordionSummary>
                                            <AccordionDetails>
                                                <div className="accordion-content">
                                                    <table>
                                                        <tr>
                                                            <th>Seating Capacity</th>
                                                            <td>4</td>
                                                        </tr>
                                                        <tr>
                                                            <th>Transmition</th>
                                                            <td>Auto</td>
                                                        </tr>
                                                        <tr>
                                                            <th>KMS</th>
                                                            <td>40,000</td>
                                                        </tr>
                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )
                        }


                    </Grid>
                    <Grid item xs={12} md={6} className="order-md-1">
                        <div className="car-detail-img">
                            <Image src={CarImage} alt="car-img" height={300} width={600} />
                        </div>
                        <SiteButton text="View All" arrow={true} styles={{ margin: '0 0 0 auto' }} />
                    </Grid>
                </Grid>
            </Container>
            <MakeOfferCta />
        </section >
    )
}
