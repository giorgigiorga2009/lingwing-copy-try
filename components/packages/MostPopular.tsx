import { FC } from 'react'
import style from './MostPopular.module.scss'
import { useTranslation } from '@utils/useTranslation'

export const MostPopular: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.mostPopular__text}>
      {t('APP_PACKAGE_MOST_POPULAR')}
    </div>
  )
}
