import React from 'react'
import CtaBanner from '../src/components/CtaBanner'
import OurStats from '../src/components/ourStats'
import HowItWorks from '../src/components/howWorks'
import LandingSection from '../src/components/landingSection'
import LatestArrival from '../src/components/latestArrival'
import { CityService } from '../src/services/cityService'
import axios from 'axios'
import { APIURL } from '../src/config/apiConfig'
import Footer from '../src/components/Footer/footer'
import Head from 'next/head'
import { useRouter } from 'next/router'

export default function Home() {
  const router = useRouter()
  const handleClick = () => {
    router.push('/sell-car')
}
  return (
    <>
      <Head>
        <title>Wish Wheels</title>
      </Head>
      <LandingSection />
      <OurStats />
      <LatestArrival />
      <HowItWorks />
      <Footer 
      ctaTitle="We can help you sell your car"
      ctaBtnText="Sell Now"
      ctaAction={handleClick}
      className="site-section"  />

    </>
  )
}
