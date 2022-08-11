import { FC } from 'react'
import { useTranslation } from '../../utils/useTranslation'
import style from './LoginFooter.module.scss'

export const LoginFooter: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.footer}>
      <span>{t('APP_PRIVACY_POLICY1')}</span>
      <span className={style.link}>{t('APP_AGREE_LICENSE_2')}</span>
      <span>{t('APP_PRIVACY_POLICY_AND')}</span>
      <span className={style.link}>{t('APP_PRIVACY_POLICY3')}</span>
    </div>
  )
}
