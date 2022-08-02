import classNames from 'classnames'
import { FC } from 'react'
import Foco from 'react-foco'
import { useTranslation } from '../../utils/useTranslation'
import styles from './SideMenu.module.scss'

const LINKS = {
  English: 'https://lingwing.com/en/wizard/eng',
  Spanish: 'https://lingwing.com/en/wizard/es',
  Georgian: 'https://lingwing.com/en/wizard/ka',
  Russian: 'https://lingwing.com/en/wizard/ru',
  Turkish: 'https://lingwing.com/en/wizard/tr',
  Bengali: 'https://lingwing.com/en/wizard/bn',
  APP_FOOTER_FAQ: 'https://lingwing.com/en/faq/general/',
  'APP_menu-contact': 'https://lingwing.com/en/contact',
  'APP_menu-student': 'https://lingwing.com/en/student',
  'APP_menu-packages': 'https://lingwing.com/en/packages',
  'APP_menu-gift-review': 'https://lingwing.com/en/packages/giftTaskReview',
  'APP_menu-packages-coupon': 'https://lingwing.com/en/packages',
  APP_ABOUT_US: 'https://lingwing.com/en/about-us',
  APP_ABOUT_CERTIFICATE: 'https://lingwing.com/en/about-us?page=certificate',
  APP_ABOUT_US_PARTNERS: 'https://lingwing.com/en/about-us?page=partners',
  'APP_menu-blog': 'https://blog.lingwing.com',
  APP_ABOUT_US_JOB: 'https://lingwing.com/en/about-us?page=cv',
  APP_PRIVACY_POLICY2: 'https://lingwing.com/en/licensing-agreement?page=cv',
  APP_PRIVACY_POLICY: 'https://lingwing.com/en/privacy?page=cv',
} as const

const COURSES_KEYS: SideMenuKeys[] = [
  'English',
  'Spanish',
  'Georgian',
  'Russian',
  'Turkish',
  'Bengali',
]
const HELP_KEYS: SideMenuKeys[] = ['APP_FOOTER_FAQ', 'APP_menu-contact']
const PREMIUM_KEYS: SideMenuKeys[] = [
  'APP_menu-student',
  'APP_menu-packages',
  'APP_menu-gift-review',
  'APP_menu-packages-coupon',
]
const ABOUT_COMPANY_KEYS: SideMenuKeys[] = [
  'APP_ABOUT_US',
  'APP_ABOUT_CERTIFICATE',
  'APP_ABOUT_US_PARTNERS',
  'APP_menu-blog',
  'APP_ABOUT_US_JOB',
  'APP_PRIVACY_POLICY2',
  'APP_PRIVACY_POLICY',
]

type SideMenuKeys = keyof typeof LINKS

interface SectionProps {
  options: SideMenuKeys[]
  title: string
}

const Section: FC<SectionProps> = ({ options, title }) => {
  const { t } = useTranslation()

  return (
    <section>
      <h3>{title}</h3>
      <div className={styles.list}>
        {options.map(element => (
          <a href={LINKS[element]} key={element}>
            {t(element)}
          </a>
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
            <Section title={t('APP_FOOTER_COURSES')} options={COURSES_KEYS} />
            <Section title={t('APP_menu-premium')} options={PREMIUM_KEYS} />
            <Section
              title={t('APP_menu-company')}
              options={ABOUT_COMPANY_KEYS}
            />
            <Section title={t('APP_menu-help')} options={HELP_KEYS} />
          </div>

          <div className={styles.footer}>
            <h3 className={styles.title}>{t('APP_DOWNLOAD_APP')}</h3>
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
