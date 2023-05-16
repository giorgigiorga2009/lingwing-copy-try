import Link from 'next/link'
import { useRouter } from 'next/router'
import style from './StartButton.module.scss'
import { FC, useEffect, useState } from 'react'
import { getUsersAmount } from '@utils/getUsersAmount'
import { useTranslation } from '@utils/useTranslation'

export const StartButton: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const [usersAmount, setUsersAmount] = useState()

  useEffect(() => {
    getUsersAmount().then(response => setUsersAmount(response))
  }, [])

  return (
    <div className={style.container}>
      <div className={style.title}>
        <span>{t('join')}</span>
        <span className={style.usersAmount}>{usersAmount}</span>
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
