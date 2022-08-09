import { FC } from 'react'
import style from './Footer.module.scss'
import { useTranslation } from '../../utils/useTranslation'
import { FOOTER_LINKS } from '../../utils/const'

export const Footer: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.footer}>
      {FOOTER_LINKS.map(link => (
        <div key={link} className={style.link}>
          {t(link)}
        </div>
      ))}
    </div>
  )
}
