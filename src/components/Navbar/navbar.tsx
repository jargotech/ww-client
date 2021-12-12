import { Container, Chip } from '@mui/material'
import React, { useEffect, useState } from 'react'
import Image from 'next/image'
import Logo from '../../../public/wishwheels-logo.svg'
import Link from 'next/link'
import { LocationChip } from '../Navbar/navbarElement'
import { useRouter } from 'next/router';

export default function Navbar() {
    const [isActive, setIsActive] = useState(false);
    const [navbarScroll, setNavbarScroll] = useState(false);
    const router = useRouter();

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
    useEffect(() => {
        ScrollBackground();
        window.addEventListener('scroll', ScrollBackground);
    }, []);


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
                                        <Link href="/car-listing">
                                            <a className={router.pathname == "/car-listing" ? "is-active" : ""}>About Us</a>
                                        </Link>
                                    </li>
                                    {/* <li>
                                        <LocationChip label="Mumbai" />
                                    </li> */}
                                </ul>
                            </nav>
                        </div>
                    </div>
                </Container>
            </header>
        </>

    )
}
