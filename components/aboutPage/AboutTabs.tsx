import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import style from './AboutTabs.module.scss'
import { ABOUT_COMPANY_LINKS } from '@utils/const'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  activeTab: string
}

const AboutTabs: FC<Props> = ({ activeTab }) => {
  const { t } = useTranslation()

  return (
    <nav className={style.nav}>
      <ul className={style.ulNav}>
        {ABOUT_COMPANY_LINKS.map(item => (
          <Link
            className={style.link}
            href={{
              pathname: '/aboutCompany',
              query: { page: item },
            }}
          >
            <li
              key={item}
              className={classNames(
                style.liNav,
                activeTab == item && style.activeMenu,
              )}
            >
              {t(item)}
            </li>
          </Link>
        ))}
      </ul>
    </nav>
  )
}

export default AboutTabs
