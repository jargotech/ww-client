import React from 'react'
import CtaBanner from '../src/components/CtaBanner'
import OurStats from '../src/components/ourStats'
import HowItWorks from '../src/components/howWorks'
import LandingSection from '../src/components/landingSection'

export default function Home() {
  return (
    <>
      <LandingSection />
      <OurStats />
      <HowItWorks />
      <CtaBanner />
    </>
  )
}
