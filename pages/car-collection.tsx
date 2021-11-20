import { Container, Grid, styled } from '@mui/material'
import React from 'react'
import SiteButton from '../src/components/Button'
import CarCards from '../src/components/carCards'
import CarListing from '../src/components/carListing'
import CtaBanner from '../src/components/CtaBanner'


export default function CarCollection() {
    return (
        <div>
            <CarListing />
            <CtaBanner />
        </div>
    )
}
