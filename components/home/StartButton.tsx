import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC, useEffect, useState } from 'react'
import { getUsersAmount } from '../../utils/getUsersAmount'
import { useTranslation } from '../../utils/useTranslation'
import style from './StartButton.module.scss'

export const StartButton: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [usersAmount, setUsersAmount] = useState()

  useEffect(() => {
    getUsersAmount().then(response => setUsersAmount(response))
  }, [])

  const linkStyles = {
    textDecoration: 'none',
  }

  return (
    <div className={style.container}>
      <div className={style.title}>
        <span>{t('join')}</span>
        <span className={style.usersAmount}>{usersAmount}</span>
        <span>{t('users')}</span>
      </div>

      <div className={style.button}>
        <span className={style.bubbleUp} />
        <Link style={linkStyles} locale={router.locale} href="/wizard">
          <span className={style.text}>{t('homeStartButton')}</span>
        </Link>
        <span className={style.bubbleDown} />
      </div>
    </div>
  )
}
