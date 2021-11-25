import React from 'react'
import { Container, FormControl, Grid, Input, InputAdornment, InputLabel } from '@mui/material'
import RupeeLogo from '../../../public/rupee.svg'
import Image from 'next/image'
import SiteButton from '../Button'
import CarCards from '../carCards'


export default function MakeOffer(props: any) {
    const {
        formik

    } = props;
    return (
        <div>
            <FormControl variant="standard">
                <InputLabel htmlFor="input-with-icon-adornment">
                    make your offer
                </InputLabel>
                <Input
                    name="makeOffer"
                    value={formik.values.makeOffer}
                    onChange={formik.handleChange}
                    id="input-with-icon-adornment"
                    placeholder="59,00,000"
                    startAdornment={
                        <InputAdornment position="start">
                            <Image src={RupeeLogo} width={10} height={16} alt="rupeelogo" />
                        </InputAdornment>
                    }
                />
            </FormControl>
            <p className="light-text">How much would you like  to buy this car for</p>
        </div>
    )
}
