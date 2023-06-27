import { FC } from 'react'
import style from './SignUpFooter.module.scss'
import { useTranslation } from '@utils/useTranslation'

export const SignUpFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.footer}>
      <span>{t('AUTH_FOOTER1')}</span>
      <span className={style.link}>{t('AUTH_FOOTER2')}</span>
      <span>{t('AUTH_FOOTER3')}</span>
      <span className={style.link}>{t('AUTH_FOOTER4')}</span>
    </div>
  )
}
