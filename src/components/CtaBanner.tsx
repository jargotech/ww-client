import React from 'react'
import { Container} from '@mui/material'
import SiteButton from './Button'

export default function CtaBanner() {
    return (
        <div className="cta-banner">
             <Container maxWidth="lg">
                 <h3>We can help you sell your car</h3>
                 <SiteButton text="Sell Now" arrow={true} />

             </Container>
        </div>
    )
}
