import { Container, Grid } from '@mui/material'
import React,{useState} from 'react'
import CarCards from './carCards'
import { styled } from '@mui/system';
import SiteButton from './Button';
import router from 'next/router';

const StyledGrid = styled(Grid)`
@media(max-width:576px){
    justify-content: center !important;
}
`;

export default function LatestArrival({ cars }: any) {
    const [carInfo,setCarInfo] = useState<any>({})

    const handelClick = () => {
        router.push('/car-collection');
    }
    // setCarInfo(
    //     {
    //         CarName
    //     }
    // )
    return (
        <section className="latest-arrival site-section">
            <Container maxWidth="lg">
                <div className="flex-container">
                    <h3 className="section-title">
                        Latest <span>Arrival</span>
                    </h3>
                    <SiteButton text="SHOW ALL" onClick={handelClick} arrow={true} />
                </div>
                <StyledGrid container rowSpacing={3} spacing={2}>
                    {
                        cars && cars.map((car: any, index: number) => (

                            <Grid key={index} item sm={6} md={4}>
                                <CarCards 
                                {...car}
                                />
                                {/* {car?.Car_Detail?.name}
                                <br />
                                {car?.Car_Detail?.fuelType}
                                <br />
                                {car?.Car_Detail?.year}
                                <br />
                                {car?.Car_Images[0]?.imageLink} */}
                            </Grid>

                        ))
                    }

                    {/* <Grid item sm={6} md={4}>
                        <CarCards />
                    </Grid>
                    <Grid item sm={6} md={4}>
                        <CarCards />
                    </Grid> */}
                </StyledGrid>
            </Container>
        </section >
    )
}
