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

export default function Home() {

  return (
    <>
      <Head>
        <title>Wish Wheels</title>
      </Head>
      <LandingSection />
      <OurStats />
      <LatestArrival />
      <HowItWorks />
      <Footer className="site-section" />

    </>
  )
}
