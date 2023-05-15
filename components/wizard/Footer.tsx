import { FC } from 'react'
import style from './Footer.module.scss'
import { FOOTER_LINKS } from '@utils/const'
import { useTranslation } from '@utils/useTranslation'

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
