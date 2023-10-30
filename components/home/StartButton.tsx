import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './StartButton.module.scss'
import { FC, useEffect, useState } from 'react'
import { getUsersAmount } from '@utils/getUsersAmount'
import { useTranslation } from '@utils/useTranslation'

export const StartButton: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [usersAmount, setUsersAmount] = useState(0)

  useEffect(() => {
    getUsersAmount()
      .then(response => {
        setUsersAmount(response)
        return response
      })
      .catch(error => {
        console.error('Failed to fetch users amount: ', error)
      })
  }, [])

  return (
    <div className={style.container}>
      <div className={style.title}>
        <span>{t('join')}</span>
        <span className={style.usersAmount}>
          {usersAmount?.toLocaleString()}
        </span>
        <span>{t('users')}</span>
      </div>
      <Link className={style.link} locale={router.locale} href="/wizard">
        <div className={style.button}>
          <span className={style.bubbleUp} />
          <span className={style.text}>{t('homeStartButton')}</span>
          <span className={style.bubbleDown} />
        </div>
      </Link>
    </div>
  )
}
