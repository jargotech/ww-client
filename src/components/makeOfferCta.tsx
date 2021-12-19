/* eslint-disable @next/next/no-img-element */
import { Container } from '@mui/material'
import React from 'react'
import SiteButton from './Button'
import { useRouter } from 'next/router'
import Fuel from '../../public/fuel.svg'
import Gauge from '../../public/gauge.svg'
import User from '../../public/user.svg'

export default function MakeOfferCta({ carId }: any) {
    const router = useRouter();
    const makeOffer = () => {
        router.push({
            pathname: '/book-car',
            query: { carId: carId }
        })
    }
    return (
        <div className="make-offer-cta">
            <Container maxWidth="lg">
                <div className="flex-container">
                    <div className="car-description-detail">
                        <h5>Range Rover Velar R Dynamic 2018</h5>
                        <div className="car-meta-deatil">
                            <ul>
                                <li>
                                    <img src={Fuel.src} alt="fuel" />
                                    <span>Diesel</span>
                                </li>
                                <li>
                                    <img src={Gauge.src} alt="fuel" />
                                    <span>55,000 KM</span>
                                </li>
                                <li>
                                    <img src={User.src} alt="fuel" />
                                    <span>2nd Owner </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="car-price-detail">
                        <h4 className="car-price">₹ 54,00,000</h4>
                        <SiteButton text="Make Offer" arrow={true} onClick={makeOffer} />
                    </div>
                </div>
            </Container>
        </div>
    )
}
