import {
  ABOUT_COMPANY_KEYS,
  COURSES_KEYS,
  HELP_KEYS,
  PREMIUM_KEYS,
  SIDE_MENU_LINKS,
} from '@utils/const'
import { FC } from 'react'
import Link from 'next/link'
import Foco from 'react-foco'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import styles from './SideMenu.module.scss'
import { useTranslation } from '@utils/useTranslation'

export type SideMenuKeys = keyof typeof SIDE_MENU_LINKS

interface SectionProps {
  options: SideMenuKeys[]
  title: string
  useNextJsLink?: boolean
}

const Section: FC<SectionProps> = ({ options, title, useNextJsLink }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <section>
      <h3>{title}</h3>
      <div className={styles.list}>
        {!useNextJsLink
          ? options.map(element => (
              <a href={SIDE_MENU_LINKS[element]} key={element}>
                {t(element)}
              </a>
            ))
          : options.map(element => (
              <Link
                href={{
                  pathname: `/wizard`,
                  query: { languageTo: SIDE_MENU_LINKS[element] },
                }}
                locale={router.locale}
                as="/wizard"
                key={element}
              >
                {t(element)}
              </Link>
            ))}
      </div>
    </section>
  )
}

interface SideMenuProps {
  onClose: () => void
}

export const SideMenu: FC<SideMenuProps> = ({ onClose }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <Foco
        component="div"
        className={styles.container}
        onClickOutside={onClose}
      >
        <div className={styles.button} onClick={onClose} />
        <div className={styles.content}>
          <div className={styles.menu}>
            <Section
              useNextJsLink
              title={t('footerCourses')}
              options={COURSES_KEYS}
            />
            <Section title={t('menuPremium')} options={PREMIUM_KEYS} />
            <Section title={t('menuCompany')} options={ABOUT_COMPANY_KEYS} />
            <Section title={t('menuHelp')} options={HELP_KEYS} />
          </div>

          <div className={styles.footer}>
            <h3 className={styles.title}>{t('menuDownloadApp')}</h3>
            <div className={styles.mobileMarkets}>
              <a
                className={classNames(styles.market, styles.apple)}
                href="https://play.google.com/store/apps/details?id=org.android.lingwing.app"
              />
              <a
                className={classNames(styles.market, styles.google)}
                href="https://apps.apple.com/us/app/lingwing-language-learning/id1217989755"
              />
            </div>
          </div>
        </div>
      </Foco>
    </div>
  )
}
