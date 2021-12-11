/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid, styled } from '@mui/material'
import React, { useState, useEffect } from 'react'
import SiteButton from '../src/components/Button'
import CarCards from '../src/components/carCards'
import CarListing from '../src/components/carListing'
import CtaBanner from '../src/components/CtaBanner'
import Footer from '../src/components/Footer/footer'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { CarService } from '../src/services/cars/carService'


export default function CarCollection() {
    // States
    const [cars, setCars] = useState<any[]>([]);

    // Variable
    const router = useRouter()
    const _carService = new CarService();


    // Functions
    const handleClick = () => {
        router.push('/sell-car')
    }

    const _getAllCarList = () => {
        const allCarsList = _carService.getAllCollection();
        allCarsList.then((res: any) => {
            if (res.status == 200) {
                console.log(res.data.data);
                const data = res.data.data;
                setCars(data);
            }
        })

    }

    // Effects
    useEffect(() => {
        _getAllCarList();
    }, []);

    return (
        <div>
            <Head>
                <title>Wish Wheels | Car Collection</title>
            </Head>
            <CarListing 
            allCars={cars}
            />
            <Footer
                ctaTitle="Looking for something specific ?"
                ctaBtnText="Talk to us"
                ctaAction={handleClick}
            />
        </div>
    )
}
