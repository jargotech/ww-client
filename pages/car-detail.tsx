/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import CarDetailComponent from '../src/components/carDetail/car-detail-component'
import Head from 'next/head'
import { CarService } from '../src/services/cars/carService';
import { useRouter } from 'next/router'

export default function CarDetail() {
    // States
    const [carDetail, setCarDetail] = useState<any[]>([]);

    // Variables
    const carDetailService = new CarService();
    const router = useRouter()
    const carId = router.query.carId

    // Funcitions

    const _getCarDetailService = () => {
        const carDetailData = carDetailService.getCarDetailById(carId);
        carDetailData.then((res: any) => {
            if (res.status == 200) {
                // console.log(res.data.data)
                // #1. Storing all car Detail in the States
                setCarDetail(res.data.data);
            }
        })
    }

    // Effects
    useEffect(() => {
        if (carId) {
            _getCarDetailService();
        }
    }, [carId]);
    return (
        <div>
            <Head>
                <title>Wish Wheels | Car Detail</title>
            </Head>
            <CarDetailComponent
            carData = {carDetail}
            />
        </div>
    )
}
