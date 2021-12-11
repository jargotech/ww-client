import React from 'react'
import { FormControl, Grid, Input, InputAdornment, InputLabel, TextField } from '@mui/material'
import RupeeLogo from '../../../public/rupee.svg'
import Image from 'next/image'
// import MaskedInput from 'react-text-mask'


export default function MakeOffer(props: any) {
    // States

    // Variable
    const { formik, carInfo } = props;
    const minPrice = carInfo[0]?.Car_Detail.minPrice;
    const maxPrice = carInfo[0]?.Car_Detail.maxPrice;

    // Function

    // Effects

    return (
        <div>
            <p>minPrice: {minPrice}</p>
            <p>maxPrice: {maxPrice}</p>
            <FormControl variant="standard">
                <InputLabel className="bold-label" htmlFor="input-with-icon-adornment">
                    make your offer
                </InputLabel>
                {/* <MaskedInput
                    // mask={['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/]}
                    mask={[/[1-9]/, /\d/, ',', /\d/, /\d/, ',', /\d/, /\d/, /\d/]}
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
                /> */}
                <Input
                    name="makeOffer"
                    type='number'
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
            {
                formik?.values?.makeOffer !== 0 && formik?.values?.makeOffer
                    ?
                    formik?.values?.makeOffer > maxPrice && formik?.values?.makeOffer
                        ?
                        <p className="success-text">Too High</p>
                        :
                        formik?.values?.makeOffer >= minPrice && formik?.values?.makeOffer
                            ?
                            <p className="success-text">Good Deal</p>
                            :
                            formik?.values?.makeOffer < minPrice && formik?.values?.makeOffer
                                ?
                                <p className="error-text">Bad Deal</p>
                                :
                                <></>
                    :
                    <p className="light-text">How much would you like  to buy this car for</p>
            }

        </div>
    )
}
