import { Container, Grid, styled } from '@mui/material'
import React from 'react'
import SiteButton from '../src/components/Button'
import CarCards from '../src/components/carCards'
import CarListing from '../src/components/carListing'
import CtaBanner from '../src/components/CtaBanner'
import Footer from '../src/components/Footer/footer'
import Head from 'next/head'


export default function CarCollection() {
    return (
        <div>
            <Head>
                <title>Wish Wheels | Car Collection</title>
            </Head>
            <CarListing />
            <Footer />
        </div>
    )
}
