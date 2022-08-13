import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useTranslation } from '../utils/useTranslation'
import style from './StartButton.module.scss'

export const StartButton: FC = () => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <div className={style.container}>
      <div className={style.title}>
        <span>{t('join')}</span>
        <span className={style.usersAmount}>261 872</span>
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
