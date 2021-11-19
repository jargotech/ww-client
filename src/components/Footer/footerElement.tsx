import { styled } from '@mui/system';

export const FooterWrapper = styled('footer')`
background: #0B0D17;
padding:40px 0px;
`;

export const FooterLinkTitle = styled('h5')`
font-family:var(--primary-fonts)!important;
font-weight: 500;
font-size: 20px;
color: #FFFFFF;
margin: 0px 0px 15px 0px;
`;

export const FooterLinkContainer = styled('ul')`
    list-style:none;
    padding:0px;
    margin:0px;

    & a{
        font-family:"Helvetica";
        font-weight: 400;
        font-size: 16px;
        color: #D9DBE1;
        display:inline-block;
        margin-bottom:10px;
    }
`;