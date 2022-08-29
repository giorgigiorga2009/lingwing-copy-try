import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { useTranslation } from '../../utils/useTranslation'
import style from './StartButton.module.scss'

const getCount = () => {
  return axios
    .get(`${process.env.defaultURL}/users/count`)
    .then(response => {
      console.log(response)
      return response.data.data
    })
    .catch(error => console.log(error))
}

export const StartButton: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [count, setCount] = useState()

  useEffect(() => {
    getCount().then(response => {
      setCount(response)
    })
  }, [])

  return (
    <div className={style.container}>
      <div className={style.title}>
        <span>{t('join')}</span>
        <span className={style.usersAmount}>{count}</span>
        <span>{t('users')}</span>
      </div>

      <div className={style.button}>
        <span className={style.bubbleUp} />
        <Link locale={router.locale} href="/wizard">
          <span className={style.text}>{t('homeStartButton')}</span>
        </Link>
        <span className={style.bubbleDown} />
      </div>
    </div>
  )
}
