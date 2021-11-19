import React from 'react'
import { Button } from '@mui/material'
import { styled } from '@mui/system';
import ArrowRightLogo from '../../public/arrow-right.svg'
import Image from 'next/image'


const StyledButton = styled(Button)`
background: #F7F3D0;
border: 1px solid #F7F3D0;
box-sizing: border-box;
border-radius: 4px;
padding:8px 0px;
display:flex;
max-width:200px;
width:100%;
align-items: center;

:hover{
    background: #F7F3D0;
}

font-family: SF Pro Display;
font-weight: 700;
font-size: 15px;
letter-spacing: 0.46px;
text-transform: uppercase;
color: #640E27;
 & span{
     display:inline-block !important;
     margin:0px 0px 0px 12px !important;
     width:16px !important;
     height:16px !important;
 }
`;


interface SiteButtonTypes {  
    text: String,  
    arrow:Boolean,
  }

export default function SiteButton({text, arrow}:SiteButtonTypes) {
    return (
        <StyledButton>
            {text}
            {arrow? (<Image src={ArrowRightLogo} height={16} width={16} alt={"arrow-right"} />): nul}
            
        </StyledButton>
    )
}
