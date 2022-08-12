import { FC } from 'react'
import { useTranslation } from '../utils/useTranslation'
import style from './BackButton.module.scss'

interface Props {
  onClick: () => void
}

export const BackButton: FC<Props> = ({ onClick }) => {
  const { t } = useTranslation()
  return (
    <div className={style.backButton} onClick={onClick}>
      <span className={style.icon} />
      <span>{t('WIZARD_BACK_BUTTON')}</span>
    </div>
  )
}
