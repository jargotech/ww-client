import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system';
import ArrowRightLogo from '../../public/arrow-right.svg'
import Image from 'next/image'


const StyledButton = styled(Button)`
box-sizing: border-box !important;
border-radius: 4px !important;
padding:8px 22px !important;
display:flex !important;
align-items: center !important;
font-weight: 700 !important;
font-size: 14px !important;
letter-spacing: 0.46px !important;
text-transform: uppercase !important;
 & span{
     display:inline-block !important;
     margin:0px 0px 0px 12px !important;
     width:14px !important;
     height:14px !important;
 }

 @media(max-width:992px){
     margin:0 auto !important;
 }
 @media(max-width:567px){
    padding:5px 15px !important;
 }
`;


interface SiteButtonTypes {
    text: String,
    arrow?: Boolean,
    onClick?: any,
    buttonVariant?: string,
    styles?: any
    disabled?: boolean
}

export default function SiteButton({ text, arrow, onClick, buttonVariant, styles, disabled }: SiteButtonTypes) {
    return (
        <StyledButton
            disabled={disabled}
            type="submit"
            className={buttonVariant == null || buttonVariant == 'primary' ? 'primary-btn' : buttonVariant == 'secondary' ? 'secondary-btn' : ''}
            onClick={onClick}
            sx={styles}>
            {text}
            {arrow == true ? (<Image src={ArrowRightLogo} height={16} width={16} alt={"arrow-right"} />) : null}

        </StyledButton>
    )
}
