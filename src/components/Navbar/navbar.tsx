import { Container, Chip } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import Logo from '../../../public/wishwheels-logo.svg'
import Link from 'next/link'
import { LocationChip } from '../Navbar/navbarElement'

export default function Navbar() {
    const [isActive, setIsActive] = React.useState(false);

    return (
        <>
            <div className={isActive ? "backdrop" : ''}></div>
            <header className="site-header">
                <Container maxWidth="lg">
                    <div className="site-header-wrapper">
                        <Link href="/">
                            <a>
                                <Image
                                    src={Logo}
                                    alt="siteLogo"
                                    width={50}
                                    height={50}
                                />
                            </a>
                        </Link>
                        <button className={isActive ? "btn-nav-toggler is-active" : "btn-nav-toggler"} onClick={() => setIsActive(!isActive)}>
                            <span></span>
                            <span></span>
                            <span></span>
                        </button>
                        <div className={isActive ? "header-links-wrapper is-active" : "header-links-wrapper"}>
                            <nav className="site-nav">
                                <ul className="list-style-none">
                                    <li>
                                        <Link href="/car-listing">
                                            <a>Sell Car</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/car-listing">
                                            <a>Browse Car</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/faq">
                                            <a>FAQ</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href="/car-listing">
                                            <a>About Us</a>
                                        </Link>
                                    </li>
                                    <li>
                                        <LocationChip label="Mumbai" />
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </div>
                </Container>
            </header>
        </>

    )
}
