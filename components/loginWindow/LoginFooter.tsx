import { FC } from 'react'
import style from './LoginFooter.module.scss'
import { useTranslation } from '@utils/useTranslation'

export const LoginFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.footer}>
      <span>{t('loginFooter1')}</span>
      <span className={style.link}>{t('loginFooter4')}</span>
      <span>{t('loginFooter2')}</span>
      <span className={style.link}>{t('loginFooter3')}</span>
    </div>
  )
}
