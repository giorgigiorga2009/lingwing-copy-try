import { Header } from '@components/header/Header'
import React from 'react'
import style from './free-trial.module.scss'
import { FollowButtons } from '@components/home/FollowButtons'
import { Footer } from '@components/wizard/Footer'
import Card from '@components/free-trial/container/container'

const freeTrial = () => {
  return (
    <>
      <Header size="s" />
      <div className={style.container}>
        <Card />
      </div>
      <div className={style.footer}>
        <FollowButtons color="grey" />
        <Footer />
      </div>
    </>
  )
}

export default freeTrial
