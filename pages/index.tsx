import React, { useState, useEffect } from 'react'
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
import { LandingService } from '../src/services/home/landing-service'

export default function Home() {
  // States
  const [landingDetail, setLandingDetail] = useState<any>();
  const [latestArrival, setLatestArrival] = useState<any[]>([]);
  const [stats, setStats] = useState<any>();
  

  // Variables
  const router = useRouter()
  const landingService = new LandingService();


  // Functions
  const _getAllLandingDetail = () => {
    
    // #1. Home and Stats section
    const api: any = landingService.getAllLandingService();
    api.then((res: any) => {
      if (res.status == 200) {
        // console.log(res.data);
        // #1. First section 
        setLandingDetail(res.data.data);
        // #2. Second section (stats section)
        setStats({
          serviceCities: landingDetail?.NoOfCity,
          numberOfCars: landingDetail?.NoOfCar,
        })
      }
    })

    // #2. Latest Arrival 
    const latestArrivalApi = landingService.getAllLatesArrival();
    latestArrivalApi.then((res:any)=>{
      if(res.status == 200 ){
        // console.log(res.data.data);
        const data = res.data.data;
        // console.log(data);
        // #1. Latest Arrival
        setLatestArrival(data);
      }
    })
  }
  const handleClick = () => {
    router.push('/sell-car')
  }

  // Effects
  useEffect(() => {
    _getAllLandingDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <Head>
        <title>Wish Wheels</title>
      </Head>
      <LandingSection
      {...landingDetail?.dashboardData[0]}
      />
      <OurStats
      {...stats}
       />
      <LatestArrival 
      cars={latestArrival}
      />
      <HowItWorks />
      <Footer
        ctaTitle="We can help you sell your car"
        ctaBtnText="Sell Now"
        ctaAction={handleClick}
        className="site-section" />

    </>
  )
}
