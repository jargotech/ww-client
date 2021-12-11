import { Container, Grid } from '@mui/material'
import SiteButton from './Button'
import React from 'react'
import Image from 'next/image'
import HeroImage from '../../public/heroImg.png'
import { useRouter } from 'next/router'

interface landingSectionTypes {
    title?: any,
    subTitle?: string,
    imageLink: any,
    ctaLabel?: string,
    ctaLink?: string,
}
export default function LandingSection({ title, subTitle, imageLink, ctaLabel, ctaLink }: landingSectionTypes) {
    const router = useRouter()
    const handleClick = () => {
        // router.push('/car-collection')
        router.push(`/${ctaLink}`)
    }
    const test = 'Premium Pre-<span>Owned</span> Cars ';


    // Functions
    function createMarkup() {
        // return { __html: test.replace('$', '<span>').replace('$', '</span>') };
        return { __html: title || "-"};

    }
    return (
        <section className="landign-section site-section">
            <Container maxWidth="lg">
                <Grid container spacing={2}>
                    <Grid item xs={12} lg={6}>
                        {/* <Image src={HeroImage} height={529} width={1117} alt="Landing Image" /> */}
                        {imageLink &&
                            <Image src={HeroImage} height={529} width={1117} alt="Landing Image" />
                        }
                    </Grid>
                    <Grid item xs={12} lg={6}>
                        <div className="position-relative">
                            {/* <h3>Premium Pre-<span>Owned</span> Cars</h3> */}
                            <h3 dangerouslySetInnerHTML={createMarkup()}></h3>
                            {/* <p>Don’t deny yourself the pleasure of driving the best premium cars from around the world here and now</p> */}
                            <p>{subTitle || '-'}</p>
                            {/* <SiteButton text="SEE COLLECTION" arrow={true} onClick={handleClick} /> */}
                            <SiteButton text={ctaLabel || '-'} arrow={true} onClick={handleClick} />
                        </div>
                    </Grid>
                </Grid>
            </Container>
        </section>
    )
}
