/* eslint-disable react-hooks/exhaustive-deps */
import { Container, Grid, styled } from "@mui/material";
import React, { useState, useEffect } from "react";
import SiteButton from "../src/components/Button";
import CarCards from "../src/components/carCards";
import CarListing from "../src/components/carListing";
import CtaBanner from "../src/components/CtaBanner";
import Footer from "../src/components/Footer/footer";
import Head from "next/head";
import { useRouter } from "next/router";
import { CarService } from "../src/services/cars/carService";
import whatsAppIcon from "../public/whatsapp.svg";
import { CompanyDetail } from "../src/services/user/contactDetail";

export default function CarCollection() {
  // States
  const [cars, setCars] = useState<any[]>([]);
  const [url, setUrl] = useState<any>();

  // Variable
  const router = useRouter();
  const _carService = new CarService();
  const companyDetailService = new CompanyDetail();
  const [companyDetail, setCompanyDetail] = useState<any>();

  // Functions
  const handleClick = () => {
    router.push("/sell-car");
  };

  const _getAllCarList = () => {
    const allCarsList = _carService.getAllCollection();
    allCarsList.then((res: any) => {
      if (res.status == 200) {
        // console.log(res.data.data);
        const data = res.data.data;
        setCars(data);
      }
    });
  };

  const shareUrl = () => {
    console.log("working..");
  };

  const getComapnyDetails = async () => {
    try {
      const companyDetailData =
        await companyDetailService.getAllContactDetail();
      if (!companyDetailData.data.error) {
        setCompanyDetail(companyDetailData.data.data);
      }
    } catch (error) {}
  };

  // Effects
  useEffect(() => {
    _getAllCarList();
    setUrl(window?.location?.href);
  }, []);

  useEffect(() => {
    getComapnyDetails();
  }, []);

  return (
    <div>
      <Head>
        <title>Wish Wheels | Car Collection</title>
      </Head>
      {cars ? (
        <CarListing allCars={cars} />
      ) : (
        <p className="no-data-available section-title">No Cars Available.</p>
      )}

      {url && companyDetail && url ? (
        <a
          className="sharebtn"
          href={`https://api.whatsapp.com/send?phone=+91${companyDetail.contactNo}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={whatsAppIcon.src} />
        </a>
      ) : (
        ""
      )}

      <Footer
        ctaTitle="Looking for something specific ?"
        ctaBtnText="Talk to us"
        ctaAction={handleClick}
      />
    </div>
  );
}
