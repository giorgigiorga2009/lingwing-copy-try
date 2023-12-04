import React from 'react'
import { NextPage } from 'next'
import Image from 'next/image'
import style from './paymentSchedule.module.scss'
import rocketParrot from '@public/assets/images/rocketParrot.png'
import { FollowButtons } from '@components/home/FollowButtons'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { Reviews } from '@components/Reviews'
import Schedule from '@components/paymentSchedule/schedule'

//I am using fontawesome icon, needs to be removed: from here and from _app.tsx
const PaymentSchedule: NextPage = () => {
  return (
    <div className={style.container}>
      <Header setShowTopScores={() => false} showTopScores={false}/>
      <Image
        src={rocketParrot}
        className={style.rocketParrot}
        alt=""
        width={500}
        height={500}
        priority={true}
      />
      <Schedule />
      <Reviews />
      <FollowButtons color="grey" />
      <Footer />
    </div>
  )
}

export default PaymentSchedule
