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
  type Tabs = keyof typeof ABOUT_COMPANY_LINKS
  const TABS = Object.keys(ABOUT_COMPANY_LINKS) as Tabs[]

  return (
    <nav className={style.nav}>
      <ul className={style.ulNav}>
        {TABS.map(item => (
          <Link
            key={item}
            className={style.link}
            href={{
              pathname: '/aboutCompany',
              query: { page: ABOUT_COMPANY_LINKS[item] },
            }}
          >
            <li
              className={classNames(
                style.liNav,
                activeTab === ABOUT_COMPANY_LINKS[item] && style.activeMenu,
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
