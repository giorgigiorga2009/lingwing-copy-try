import React, { useEffect, useState } from 'react'
import style from './CountDown.module.scss'
import { getUserProfileCreationDate } from '@utils/getPayments'
import { useTranslation } from '@utils/useTranslation'

const CountdownTimer: React.FC = () => {
  const { t } = useTranslation()
  const [countdown, setCountdown] = useState<string>('')
  const [count, setCount] = useState<string>('')

  useEffect(() => {
    if (count !== '') {
      const interval = setInterval(updateCountdown, 1000)
      return () => {
        clearInterval(interval)
      }
    }
  }, [count])

  useEffect(() => {
    getCountTime()
  }, [])

  const getCountTime = async () => {
    const profileCreationDate = await getUserProfileCreationDate()
    setCount(new Date(profileCreationDate).toISOString())
  }

  const updateCountdown = () => {
    const currentTime = new Date()
    const profileCreationTime = new Date(count)
    profileCreationTime.setUTCDate(profileCreationTime.getUTCDate() + 20) // 1 = 24h

    const timeRemaining = profileCreationTime.getTime() - currentTime.getTime()

    if (timeRemaining <= 0) {
      setCountdown('Time is up!')
    } else {
      const hours = Math.floor(timeRemaining / (60 * 60 * 1000))
      const minutes = Math.floor(
        (timeRemaining % (60 * 60 * 1000)) / (60 * 1000),
      )
      const seconds = Math.floor((timeRemaining % (60 * 1000)) / 1000)

      setCountdown(
        `${hours.toString().padStart(2, '0')}:${minutes
          .toString()
          .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
      )
    }
  }
  const currentTime = new Date()
  const endTime = new Date(count)
  endTime.setUTCDate(endTime.getUTCDate() + 20)
  const timeRemaining = endTime.getTime() - currentTime.getTime()

  return (
    <div className={timeRemaining <= 0 ? style.timeIsUp : style.container}>
      <div className={style.timeLeft}>
        <span className={style.saleText}>{t('PAYMENT_SALE_TEXT')}</span>
        <span>{countdown}</span>
      </div>
    </div>
  )
}

export default CountdownTimer
