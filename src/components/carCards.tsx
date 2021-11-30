import React from 'react'
import Image from 'next/image'
import CarImage from '../../public/car-img.png'
import { Grid } from '@mui/material'
import SiteButton from './Button'
import { useRouter } from 'next/router'

interface cardType {
    variant?: string,
    hideButton?: boolean
    img?: string
    style?: any
}

export default function CarCards({ variant, hideButton, img, style }: cardType) {
    const router = useRouter()
    const handleClick = () => {
        router.push('/car-detail')
    }

    const bookTrail = () => {
        router.push('/book-car')
    }
    return (
        <div style={style} onClick={handleClick} className={(variant == 'card2') ? 'cars-cards card2' : 'cars-cards'} >
            <Image src={img || CarImage} width={435} height={270} alt="Car" />
            <div className="content">
                <h4>2015 USED AUDI A8 W12</h4>
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <p className="car-summary-header" >FUEL TYPE </p>
                        <span className="car-summary">PETROL</span>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'center' }}>
                        <p className="car-summary-header">MODEL</p>
                        <span className="car-summary">2015</span>
                    </Grid>
                    <Grid item xs={4} sx={{ textAlign: 'right' }}>
                        <p className="car-summary-header">KMS</p>
                        <span className="car-summary">40,000</span>
                    </Grid>
                </Grid>
                {
                    variant == 'card2'
                        ? (
                            <Grid container spacing={2} sx={{ marginTop: '5px' }}>
                                <Grid item xs={6} sx={{ display: 'flex', alignItems: 'center' }}>
                                    <p className="price" >₹ 59,00,000</p>
                                </Grid>
                                <Grid item xs={6} sx={{ textAlign: 'right' }}>
                                    {!hideButton ? (<SiteButton text="bOOK tRAIL" arrow={true} onClick={bookTrail} />) : null}

                                </Grid>
                            </Grid>
                        )
                        : null
                }

            </div>
        </div >
    )
}
