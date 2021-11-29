import React from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router';
import { Container } from '@mui/material';
import SiteButton from '../src/components/Button';
import Image from 'next/image'
import Icon404 from '../public/404Icon.svg'
import Polygon from '../public/Polygon.svg'

export default function PageNotFound() {
  const router = useRouter();
  const routeHome = () => {
    router.push('/')
  }
  return (
    <>
      <Head>
        <title>Wish Wheels | 404</title>
      </Head>
      <section className="page-not-found">
        <Container maxWidth="lg">
          <div className="content">
            <h1>The requested URL
              was not found
              on this server</h1>
            <SiteButton text="Home" arrow={true} onClick={routeHome} styles={{ margin: '0 0 0 auto' }} />
          </div>
          <div className="icon404-wrapper">
            <Image src={Icon404} alt="4040 icon" />
          </div>
          <div className="polygon-wrapper">
            <Image src={Polygon} alt="Polygon icon" />
          </div>
        </Container>
      </section>
    </>

  )
}
