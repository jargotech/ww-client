import React from 'react'
import { Container, Grid } from '@mui/material'
import SiteButton from './Button'
import Image from 'next/image'
import KeyImage from '../../public/keychain.png'
import { useRouter } from 'next/router'

export default function CtaBanner() {
    const router = useRouter()

    const handleClick = () => {
        router.push('/sell-car')
    }
    return (
        <section>
            <div className="cta-banner">
                <Container maxWidth="lg">
                    <h3>We can help you sell your car</h3>
                    <SiteButton text="Sell Now" arrow={true} onClick={handleClick} />
                    <Image src={KeyImage} height={240} width={230} alt="keyImage" />
                </Container>
            </div>
        </section>

    )
}
