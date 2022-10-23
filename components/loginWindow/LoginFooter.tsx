import { FC } from 'react'
import { useTranslation } from '../../utils/useTranslation'
import style from './LoginFooter.module.scss'

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
