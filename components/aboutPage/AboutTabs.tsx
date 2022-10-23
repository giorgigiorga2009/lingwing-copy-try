import classNames from 'classnames'
import { FC } from 'react'
import Link from 'next/link'
import style from './AboutTabs.module.scss'
import { useTranslation } from '../../utils/useTranslation'
import { ABOUT_COMPANY_LINKS } from '../../utils/const'

interface Props {
  activeTab: string
}

const AboutTabs: FC<Props> = ({ activeTab }) => {
  const { t } = useTranslation()

  return (
    <nav className={style.nav}>
      <ul className={style.ulNav}>
        <Link href={'/aboutCompany?page=' + ABOUT_COMPANY_LINKS.whyWithUs}>
          <li
            className={classNames(
              style.liNav,
              activeTab == ABOUT_COMPANY_LINKS.whyWithUs && style.activeMenu,
            )}
          >
            {t('menuWhyWithUs')}
          </li>
        </Link>
        <Link href={'/aboutCompany?page=' + ABOUT_COMPANY_LINKS.certificate}>
          <li
            className={classNames(
              style.liNav,
              activeTab == ABOUT_COMPANY_LINKS.certificate && style.activeMenu,
            )}
          >
            {t('menuCertificate')}
          </li>
        </Link>
        <Link href={'/aboutCompany?page=' + ABOUT_COMPANY_LINKS.partners}>
          <li
            className={classNames(
              style.liNav,
              activeTab == ABOUT_COMPANY_LINKS.partners && style.activeMenu,
            )}
          >
            {t('menuPartners')}
          </li>
        </Link>
        <Link href={'/aboutCompany?page=' + ABOUT_COMPANY_LINKS.jobs}>
          <li
            className={classNames(
              style.liNav,
              activeTab == ABOUT_COMPANY_LINKS.jobs && style.activeMenu,
            )}
          >
            {t('menuJobs')}
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default AboutTabs
