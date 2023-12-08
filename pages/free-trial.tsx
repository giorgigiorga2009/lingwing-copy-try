import React from 'react'
import { NextPage } from 'next'
import style from './free-trial.module.scss'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import Card from '@components/free-trial/container/container'
import { FollowButtons } from '@components/home/FollowButtons'

const freeTrial: NextPage = () => {
  return (
    <>
      <Header size="s" setShowTopScores={() => false} showTopScores={false}/>
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
