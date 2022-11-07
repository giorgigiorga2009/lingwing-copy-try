import { FC } from 'react'
import style from './Duration.module.scss'
import { useTranslation } from '../../utils/useTranslation'

interface Duration {
  duration: number
}

export const FreePackageName: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.freePackageName}>{t('APP_PACKAGE_LIFETIME')}</div>
  )
}

export const Duration: FC<Duration> = ({ duration }) => {
  const { t } = useTranslation()

  return (
    <div className={style.duration}>
      {duration}
      <span className={style.months}>{t('APP_PACKAGE_MONTHS')}</span>
    </div>
  )
}
