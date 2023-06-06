import { FC } from 'react'
import style from './Footer.module.scss'
import { FOOTER_LINKS } from '@utils/const'
import { useTranslation } from '@utils/useTranslation'

export const Footer: FC = () => {
  const { t } = useTranslation()
  type Links = keyof typeof FOOTER_LINKS
  const LINKS = Object.keys(FOOTER_LINKS) as Links[]

  return (
    <div className={style.footer}>
      {LINKS.map(link => (
        <div key={link} className={style.link}>
          <a href={FOOTER_LINKS[link]} key={link} className={style.link}>
            {t(link)}
          </a>
        </div>
      ))}
    </div>
  )
}
