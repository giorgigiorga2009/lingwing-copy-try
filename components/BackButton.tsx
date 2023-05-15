import { FC } from 'react'
import style from './BackButton.module.scss'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  onClick: () => void
}

export const BackButton: FC<Props> = ({ onClick }) => {
  const { t } = useTranslation()
  return (
    <div className={style.backButton} onClick={onClick}>
      <span className={style.icon} />
      <span className={style.text}>{t('backButton')}</span>
    </div>
  )
}
