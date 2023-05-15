import { FC } from 'react'
import style from './PackageButton.module.scss'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  type: 'mostPopularBtn' | 'regularPackageBtn' | 'couponBtn'
  onClick: VoidFunction | undefined
}

export const PackageButton: FC<Props> = ({ type, onClick }) => {
  const { t } = useTranslation()

  return (
    <button onClick={onClick} className={style[type]}>
      {t('APP_PACKAGE_SELECT')}
    </button>
  )
}
