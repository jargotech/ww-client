import { Container, Chip, Avatar, Box, Modal, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../../../public/wishwheels-logo.svg'
import Link from 'next/link'
import { LocationChip } from '../Navbar/navbarElement'
import { useRouter } from 'next/router';
import Authenticate from '../authenticate/authenticate'
import OtpAuthentication from '../authenticate/otp-authentication'
import { OtpService } from '../../services/user/otpService'
import { AuthenticationService } from '../../services/user/authenticationService'
import { log } from 'console'

export default function Navbar() {
    // State 
    const [isActive, setIsActive] = useState(false);
    const [navbarScroll, setNavbarScroll] = useState(false);
    const [loggedIn, setLoggedIn] = useState(false);
    const [open, setOpen] = useState(false);
    const [userName, setUserName] = useState<any>();



    // Variable
    const router = useRouter();
    const otpService = new OtpService();
    const authenticationService = new AuthenticationService();

    // functions 
    const handleSidebar = () => {
        setIsActive(!isActive)
        if (!isActive) {
            document.body.classList.add("overflow-hidden");
        } else {
            document.body.classList.remove("overflow-hidden");
        }
    }
    const ScrollBackground = () => {
        // console.log(window.scrollY);
        if (window.scrollY >= 85) {
            setNavbarScroll(true);

        } else {
            setNavbarScroll(false);
        }
    }
    function stringToColor(string: string) {
        let hash = 0;
        let i;

        /* eslint-disable no-bitwise */
        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash);
        }

        let color = '#';

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff;
            color += `00${value.toString(16)}`.substr(-2);
        }
        /* eslint-enable no-bitwise */

        return color;
    }
    function stringAvatar(name: string) {
        return {
            sx: {
                bgcolor: stringToColor(name),
            },
            children: `${name.split(' ')[0][0]}${name.split(' ')[1][0]}`,
        };
    }
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false)


    const _generateOtp = (payload: any) => {
        const generateOtpData = otpService.generateOtp(payload);
        generateOtpData.then((res: any) => {
            if (res.status == 200) {
                console.log(res?.data?.data);
                console.log(res?.data?.message);
            }
        })
    }
    const _verifyOtp = (otp: any, loggedInData: any) => {
        const payload = {
            emailId: loggedInData.emailId,
            otp: otp
        }
        const userSingInData = {
            phoneNumber: loggedInData.phoneNumber
        }
        const verifyOtpData = otpService.verifyOtp(payload);
        verifyOtpData.then((res: any) => {
            if (res.status == 200) {
                console.log(res?.data?.message);
                if (res?.data?.message == 'OTP Verifed') {
                    _userSingIn(userSingInData);
                    // console.log(userSingInData);


                }
            }
        })
    }
    const _userSingIn = (payload: any) => {
        const userSingInData = authenticationService.userSingIn(payload);
        userSingInData.then((res) => {
            if (res.status == 200) {
                const jwtData = {
                    firstName: res?.data?.firstName,
                    userId: res?.data?.id,
                    accessToken: res?.data?.accessToken
                }
                localStorage.setItem('jwt', JSON.stringify(jwtData));
                console.log(jwtData);
                let userNameData = JSON.parse(localStorage.getItem('jwt') || '')
                setUserName(userNameData.firstName)
                console.log();

                setLoggedIn(true);
                handleClose();



            }
        })

    }

    // UseEffect
    useEffect(() => {
        ScrollBackground();
        window.addEventListener('scroll', ScrollBackground);
    }, []);

    useEffect(() => {
        if (loggedIn) {

            console.log(userName);

        }
    }, [loggedIn]);

    return (
        <>
            <div className={isActive ? "backdrop" : ''}></div>
            <header id="header" className={navbarScroll ? "site-header is-active" : router.pathname == '/404' ? "site-header fixed" : "site-header"}>
                <Container maxWidth="lg">
                    <div className="site-header-wrapper">
                        <Link href="/">
                            <a>
                                <Image
                                    src={Logo}
                                    alt="siteLogo"
                                    width={70}
                                    height={70}
                                />
                            </a>
                        </Link>
                        <button className={isActive ? "btn-nav-toggler is-active" : "btn-nav-toggler"} onClick={handleSidebar}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className={isActive ? "header-links-wrapper is-active" : "header-links-wrapper"}>
                            <nav className="site-nav">
                                <ul className="list-style-none">
                                    <li>
                                        <Link href="/sell-car">
                                            <a className={router.pathname == "/sell-car" ? "is-active" : ""}>Sell Car</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/car-collection">
                                            <a className={router.pathname == "/car-collection" ? "is-active" : ""}>Browse Car</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq">
                                            <a className={router.pathname == "/faq" ? "is-active" : ""}>FAQ</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/about-us">
                                            <a className={router.pathname == "/about-us" ? "is-active" : ""}>About Us</a>
                                        </Link>
                                    </li>
                                    <li>
                                        {
                                            loggedIn &&
                                                loggedIn
                                                ?
                                                <Avatar
                                                    sx={{ bgcolor: 'orange', textTransform:'uppercase' }}
                                                    alt={userName}
                                                    src="/broken-image.jpg"
                                                />
                                                :
                                                <Avatar 
                                                onClick={handleOpen} 
                                                src="/broken-image.jpg" 
                                                />

                                        }
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </Container>
            </header>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box className="authenticate-wrapper">
                    <Authenticate generateOtp={_generateOtp} verifyOtp={_verifyOtp} userSingIn={_userSingIn} />
                </Box>
            </Modal>
        </>

    )
}
