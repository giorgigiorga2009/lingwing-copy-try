import classNames from 'classnames'
import type { FC } from 'react'
import Link from 'next/link'
import style from './AboutCompanyHeader.module.scss'
import { useTranslation } from '../../utils/useTranslation'

interface Props {
  currentMenu?: string | string[]
}

const AboutCompanyHeader: FC<Props> = ({ currentMenu }) => {
  const { t } = useTranslation()

  const WhyWithUs = 'WhyWithUs'
  const Certificate = 'Certificate'
  const Partners = 'Partners'
  const Jobs = 'Jobs'

  return (
    <nav className={style.nav}>
      <ul className={style.ulNav}>
        <Link
          href={'/[aboutCompany]?page=' + WhyWithUs}
          as={'aboutCompany?page=' + WhyWithUs}
        >
          <li
            className={classNames(
              style.liNav,
              currentMenu == WhyWithUs && style.activeMenu,
            )}
          >
            {t('menuWhyWithUs')}
          </li>
        </Link>
        <Link
          href={'/[aboutCompany]?page=' + Certificate}
          as={'aboutCompany?page=' + Certificate}
        >
          <li
            className={classNames(
              style.liNav,
              currentMenu == Certificate && style.activeMenu,
            )}
          >
            {t('menuCertificate')}
          </li>
        </Link>
        <Link
          href={'/[aboutCompany]?page=' + Partners}
          as={'aboutCompany?page=' + Partners}
        >
          <li
            className={classNames(
              style.liNav,
              currentMenu == Partners && style.activeMenu,
            )}
          >
            {t('menuPartners')}
          </li>
        </Link>
        <Link
          href={'/[aboutCompany]?page=' + Jobs}
          as={'aboutCompany?page=' + Jobs}
        >
          <li
            className={classNames(
              style.liNav,
              currentMenu == Jobs && style.activeMenu,
            )}
          >
            {t('menuJobs')}
          </li>
        </Link>
      </ul>
    </nav>
  )
}

export default AboutCompanyHeader
