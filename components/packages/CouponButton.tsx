import { FC } from 'react'
import style from './CouponButton.module.scss'
import { useTranslation } from '@utils/useTranslation'

interface CouponProps {
  type: 'mostPopularBtn' | 'regularPackageBtn' | 'couponBtn'
  onClick: VoidFunction | undefined
  value: string
}

export const CouponButton: FC<CouponProps> = ({ type, onClick, value }) => {
  const { t } = useTranslation()
  return (
    <button onClick={onClick} className={style[type]} disabled={!value}>
      {t('APP_PACKAGE_SELECT')}
    </button>
  )
}
