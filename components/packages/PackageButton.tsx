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
  onClick: VoidFunction | undefined
  // index: number | undefined
  packageId: string
}

export const PackageButton: FC<Props> = ({ type, onClick, packageId }) => {
  const { t } = useTranslation()
  return (
    <Link
      href={{
        pathname: '/payment',
        query: {
          id: packageId,
          ...(couponValue ? { coupon: couponValue } : {}),
        },
      }}
    >
      <button onClick={onClick} className={style[type]}>
        {t('APP_PACKAGE_SELECT')}
      </button>
    </Link>
  )
}
