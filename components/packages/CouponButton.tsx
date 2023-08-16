import { FC } from 'react'
import style from './CouponButton.module.scss'
import { useTranslation } from '@utils/useTranslation'

interface CouponProps {
  type: 'mostPopularBtn' | 'regularPackageBtn' | 'couponBtn'
  onClick: VoidFunction | undefined
}

export const CouponButton: FC<CouponProps> = ({ type, onClick }) => {
  const { t } = useTranslation()
  return (
    <button onClick={onClick} className={style[type]}>
      {t('APP_PACKAGE_SELECT')}
    </button>
  )
}
