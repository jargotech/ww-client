import React, { useState, useEffect } from "react";
import Image from "next/image";
import CarImage from "../../public/no-image.png";
import { Grid } from "@mui/material";
import SiteButton from "./Button";
import { useRouter } from "next/router";
import { currencyFormatter } from "../utils/currecyFormatter";

interface cardType {
  _id?: any;
  variant?: string;
  hideButton?: boolean;
  img?: string;
  style?: any;
  Car_Detail?: any;
  Car_Images?: any[];
}

export default function CarCards({
  _id,
  variant,
  hideButton,
  img,
  style,
  Car_Detail,
  Car_Images,
}: cardType) {
  // States
  const [carImage, setCarImage] = useState<any>();

  // Variables
  const router = useRouter();

  // Functions
  const handleClick = () => {
    router.push({
      pathname: "/car-detail",
      query: { carId: _id },
    });
  };

  // Effects
  useEffect(() => {
    if (Car_Images) {
      // #1. Take 1st/ Last image of car
      // const requiredCarIndex = Car_Images?.find(
      //   (item: any) => item.imageOrder == 0
      // );
      const firstImageOfCar = Car_Images?.find(
        (item: any) => item.imageOrder == 0
      );
      setCarImage(firstImageOfCar);
    }
  }, [Car_Images]);

  return (
    <div
      style={style}
      onClick={handleClick}
      className={variant == "card2" ? "cars-cards card2" : "cars-cards"}
    >
      {/* <Image src={img || CarImage} width={435} height={270} alt="Car" /> */}
      <Image
        src={carImage?.imageLink || CarImage}
        width={435}
        height={270}
        alt="Car"
      />
      <div className="content">
        {/* <h4>2015 USED AUDI A8 W12</h4> */}
        <h4>{Car_Detail?.name}</h4>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <p className="car-summary-header">FUEL TYPE </p>
            {/* <span className="car-summary">PETROL</span> */}
            <span className="car-summary">{Car_Detail?.fuelType}</span>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "center" }}>
            <p className="car-summary-header">YEAR</p>
            {/* <span className="car-summary">2015</span> */}
            <span className="car-summary">{Car_Detail?.year}</span>
          </Grid>
          <Grid item xs={4} sx={{ textAlign: "right" }}>
            <p className="car-summary-header">KMS</p>
            {/* <span className="car-summary">40,000</span> */}
            <span className="car-summary">{Car_Detail?.kmDriven}</span>
          </Grid>
        </Grid>
        {variant == "card2" ? (
          <Grid container spacing={2} sx={{ marginTop: "5px" }}>
            <Grid item xs={6} sx={{ display: "flex", alignItems: "center" }}>
              <p className="price">{currencyFormatter(Car_Detail?.maxPrice)}</p>
            </Grid>
          </Grid>
        ) : null}
      </div>
    </div>
  );
}
