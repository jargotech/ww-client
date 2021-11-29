import React from 'react'
import CarDetailComponent from '../src/components/carDetail/car-detail-component'
import Head from 'next/head'

export default function CarDetail() {
    return (
        <div>
            <Head>
                <title>Wish Wheels | Car Detail</title>
            </Head>
            <CarDetailComponent />
        </div>
    )
}
