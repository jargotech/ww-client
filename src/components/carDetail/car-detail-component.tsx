import { Accordion, AccordionDetails, AccordionSummary, Box, Button, Container, Grid, IconButton, ImageList, ImageListItem } from '@mui/material'
import Image from 'next/image'
import React, { useState } from 'react'
import CarImage from '../../../public/car-img.png'
import AccordionIcon from '../../../public/accordian-icon.svg'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SiteButton from '../Button'
import MakeOfferCta from '../makeOfferCta'
import 'react-bnb-gallery/dist/style.css'
import ReactBnbGallery from 'react-bnb-gallery';
import Slider from 'react-slick';


export default function CarDetailComponent({ carData }: any) {

    // States
    const [displayToggle, setDisplayToggle] = useState(false);
    const [expanded, setExpanded] = React.useState<string | false>('panel1');
    const [isOpen, setIsOpen] = useState(false);

    // Variables
    const carImage = carData && carData[0]?.Car_Images;
    const carId = carData && carData[0]?._id;

    const settings = {
        dots: false,
        arrows: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };


    // Function
    const handleChange =
        (panel: string) => (event: React.SyntheticEvent, newExpanded: boolean) => {
            setExpanded(newExpanded ? panel : false);
        };

    const toggleDisplay = () => {
        setDisplayToggle(!displayToggle);
    }

    // Effects

    return (
        <section className="car-detail">
            <Container maxWidth="lg">
                {/* <h3>Car Title </h3> */}
                <h3>{carData[0]?.Car_Detail?.name} </h3>
                {/* {JSON.stringify(carId)} */}
                <Grid container spacing={2} sx={{ justifyContent: 'center !important' }}>
                    <Grid item xs={12} md={4} className="order-md-2">
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
                                                        <tbody>
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
                                                        </tbody>
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
                                                        <tbody>
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
                                                        </tbody>
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
                                                        <tbody>
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
                                                        </tbody>

                                                    </table>
                                                </div>
                                            </AccordionDetails>
                                        </Accordion>
                                    </div>
                                )
                        }


                    </Grid>
                    <Grid item xs={12} md={8} className="order-md-1">
                        <Slider {...settings}>
                            {carImage &&
                                carImage.map((img: any, index: number) => (
                                    <div key={index}>
                                        <div className="car-detail-img">
                                            <Image
                                                src={img.imageLink || CarImage} alt="car-img"
                                                height={300} width={600} />
                                        </div>
                                    </div>
                                ))
                            }

                            {/* <div>
                                <div className="car-detail-img">
                                    <Image
                                        src="https://media.istockphoto.com/photos/black-car-on-the-road-picture-id1226119391?b=1&k=20&m=1226119391&s=170667a&w=0&h=lspxnUA45EFCjw9bXAgwinu1QA74QjI6QemF6oXmZTg=" alt="car-img"
                                        height={300} width={600} />
                                </div>
                            </div>
                            <div>
                                <div className="car-detail-img">
                                    <Image
                                        src="https://media.istockphoto.com/photos/silver-sports-car-on-black-tile-floor-picture-id170450723?b=1&k=20&m=170450723&s=170667a&w=0&h=A4rCaXBjUovNOGWXoyuL4hnvPxdLx3fiPdeF33XIqH0=" alt="car-img"
                                        height={300} width={600} />
                                </div>
                            </div> */}

                        </Slider>
                        {/* <div className="car-detail-img">
                            <Image
                                onClick={() => { setIsOpen(true) }}
                                src={CarImage} alt="car-img"
                                height={300} width={600} />
                        </div> */}
                        <SiteButton onClick={() => setIsOpen(true)} text="View All" arrow={true} styles={{ margin: '0 0 0 auto' }} />
                        <ReactBnbGallery
                            show={isOpen}
                            photos={
                                carImage &&
                                carImage.map((img:any)=>(
                                    img.imageLink
                                ))
                            }
                            onClose={() => setIsOpen(false)}
                        />

                    </Grid>
                </Grid>
            </Container>
            <MakeOfferCta carId={carId} />
        </section >
    )
}

// const photosArray = [
//     "https://media.istockphoto.com/photos/black-car-on-the-road-picture-id1226119391?b=1&k=20&m=1226119391&s=170667a&w=0&h=lspxnUA45EFCjw9bXAgwinu1QA74QjI6QemF6oXmZTg=",
//     "https://media.istockphoto.com/photos/silver-sports-car-on-black-tile-floor-picture-id170450723?b=1&k=20&m=170450723&s=170667a&w=0&h=A4rCaXBjUovNOGWXoyuL4hnvPxdLx3fiPdeF33XIqH0=",
//     "https://media.istockphoto.com/photos/hot-sports-car-picture-id147461270?b=1&k=20&m=147461270&s=170667a&w=0&h=BPko-5TFfhmgbS9mw31pNfhHcqX656m9LBxcGewFByM=",
//     "https://media.istockphoto.com/photos/car-driving-on-a-road-picture-id1264045165?b=1&k=20&m=1264045165&s=170667a&w=0&h=XsPL8bwJ69wGIc0oLPQ1pHkjesNjemTqKbj0YJ12t5Y=",
//     "https://media.istockphoto.com/photos/generic-modern-sports-car-in-concrete-garage-picture-id1307086563?b=1&k=20&m=1307086563&s=170667a&w=0&h=sPx3GPlfoe6NT_ZO4XyAT5eP1QbbUf5rZlSrqQmX2Ig=",
// ]

