// import { FC } from 'react'
// import style from './PackageButton.module.scss'
// import { useTranslation } from '@utils/useTranslation'

// interface Props {
//   type: 'mostPopularBtn' | 'regularPackageBtn' | 'couponBtn'
//   onClick: VoidFunction | undefined
// }

// export const PackageButton: FC<Props> = ({ type, onClick }) => {
//   const { t } = useTranslation()

//   return (
//     <button onClick={onClick} className={style[type]}>
//       {t('APP_PACKAGE_SELECT')}
//     </button>
//   )
// }

import { FC } from 'react'
import Link from 'next/link'
import style from './PackageButton.module.scss'
import { useTranslation } from '@utils/useTranslation'
import { couponValue } from './Coupon'

interface Props {
  type: 'mostPopularBtn' | 'regularPackageBtn' | 'couponBtn'
  onClick?: VoidFunction | undefined
  index: number
  packageId: string
}

export const PackageButton: FC<Props> = ({
  type,
  onClick,
  packageId,
  index,
}) => {
  const { t } = useTranslation()
  const pathname = index === 0 ? '/packages-info' : '/payment'
  const query =
    index === 0
      ? undefined
      : {
          id: packageId,
          ...(couponValue ? { coupon: couponValue } : {}),
        }
  return (
    <Link
      href={{
        pathname,
        ...(query && { query }),
      }}
    >
      <button onClick={onClick} className={style[type]}>
        {t('APP_PACKAGE_SELECT')}
      </button>
    </Link>
  )
}
