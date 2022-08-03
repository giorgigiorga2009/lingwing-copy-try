import { FC } from 'react'
import style from './Footer.module.scss'
import { useTranslation } from '../../utils/useTranslation'

const LINKS = [
  'APP_FOOTER_ABOUT_US',
  'APP_FOOTER_COURSES',
  'APP_FOOTER_PACKEGES',
  'APP_FOOTER_BLOG',
  'APP_FOOTER_APP',
  'APP_FOOTER_PRIVACY',
  'APP_FOOTER_FAQ',
  'APP_FOOTER_CONTACT',
]

export const Footer: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.footer}>
      {LINKS.map(link => (
        <div key={link} className={style.link}>
          {t(link)}
        </div>
      ))}
    </div>
  )
}
