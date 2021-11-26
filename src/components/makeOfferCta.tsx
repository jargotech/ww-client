import { Container } from '@mui/material'
import React from 'react'
import SiteButton from './Button'
import { useRouter } from 'next/router'

export default function MakeOfferCta() {
    const router = useRouter();
    const makeOffer = () => {
        router.push('/book-car')
    }
    return (
        <div className="make-offer-cta">
            <Container maxWidth="lg">
                <div className="flex-container">
                    <h4>Make an offer to book a free trail</h4>
                    <SiteButton text="Make Offer" arrow={true} onClick={makeOffer} />
                </div>
            </Container>
        </div>
    )
}
