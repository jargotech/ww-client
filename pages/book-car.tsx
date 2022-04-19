import React, { useEffect, useState } from "react";
import BookTrail from "../src/components/bookTrail/book-trial";
import Head from "next/head";
import { useRouter } from "next/router";
import { CarService } from "../src/services/cars/carService";

export default function BookCar() {
  const [carDetail, setCarDetail] = useState<any[]>([]);

  // Variables
  const carDetailService = new CarService();
  const router = useRouter();
  const carId = router.query.carId;

  // Funcitions

  const _getCarDetailService = () => {
    const carDetailData = carDetailService.getCarDetailById(carId);
    carDetailData.then((res: any) => {
      if (res.status == 200) {
        // console.log(res.data.data)
        // #1. Storing all car Detail in the States
        setCarDetail(res.data.data);
      }
    });
  };

  // Effects
  useEffect(() => {
    if (carId) {
      _getCarDetailService();
    }
  }, [carId]);
  return (
    <div>
      <Head>
        <title>Wish Wheels | Book Car</title>
      </Head>
      <BookTrail
        carData={carDetail}
        maxPriceValue={carDetail[0]?.Car_Detail?.maxPrice}
      />
    </div>
  );
}
