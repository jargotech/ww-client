import React from 'react'
import { Container, Grid } from '@mui/material'
import SiteButton from './Button'
import Image from 'next/image'
import KeyImage from '../../public/keychain.png'

export default function CtaBanner() {
    return (
        <section className="site-section d-flex align-items-center">
            <div className="cta-banner">
                <Container maxWidth="lg">
                    <h3>We can help you sell your car</h3>
                    <SiteButton text="Sell Now" arrow={true} />
                    <Image src={KeyImage} height={240} width={230} alt="keyImage" />
                </Container>
            </div>
        </section>

    )
}
