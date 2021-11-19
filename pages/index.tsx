import React from 'react'
import CtaBanner from '../src/components/CtaBanner'
import OurStats from '../src/components/ourStats'
import HowItWorks from '../src/components/howWorks'

export default function Home() {
  return (
    <>
      <OurStats />
      <HowItWorks />
      <CtaBanner />
    </>
  )
}
