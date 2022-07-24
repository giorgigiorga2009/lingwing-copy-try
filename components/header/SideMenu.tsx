import classNames from "classnames";
import { FC } from "react";
import Foco from "react-foco";
import { useIntl } from "react-intl";
import styles from './SideMenu.module.scss'

const LINKS = {
  English: "https://lingwing.com/en/wizard/eng",
  Spanish: "https://lingwing.com/en/wizard/es",
  Georgian: "https://lingwing.com/en/wizard/ka",
  Russian: "https://lingwing.com/en/wizard/ru",
  Turkish: "https://lingwing.com/en/wizard/tr",
  Bengali: "https://lingwing.com/en/wizard/bn",
  "APP_FOOTER_FAQ": "https://lingwing.com/en/faq/general/",
  "APP_menu-contact": "https://lingwing.com/en/contact",
  "APP_menu-student": "https://lingwing.com/en/student",
  "APP_menu-packages": "https://lingwing.com/en/packages",
  "APP_menu-gift-review": "https://lingwing.com/en/packages/giftTaskReview",
  "APP_menu-packages-coupon": "https://lingwing.com/en/packages",
  "APP_ABOUT_US": "https://lingwing.com/en/about-us",
  "APP_ABOUT_CERTIFICATE": "https://lingwing.com/en/about-us?page=certificate",
  "APP_ABOUT_US_PARTNERS": "https://lingwing.com/en/about-us?page=partners",
  "APP_menu-blog": "https://blog.lingwing.com",
  "APP_ABOUT_US_JOB": "https://lingwing.com/en/about-us?page=cv",
  "APP_PRIVACY_POLICY2": "https://lingwing.com/en/licensing-agreement?page=cv",
  "APP_PRIVACY_POLICY": "https://lingwing.com/en/privacy?page=cv",
}

const COURSES_KEYS = ["English", "Spanish", "Georgian", "Russian", "Turkish", "Bengali"] as const
const HELP_KEYS = ["APP_FOOTER_FAQ", "APP_menu-contact"] as const
const PREMIUM_KEYS = [
  "APP_menu-student",
  "APP_menu-packages",
  "APP_menu-gift-review",
  "APP_menu-packages-coupon"
] as const
const ABOUT_COMPANY_KEYS = [
  'APP_ABOUT_US',
  'APP_ABOUT_CERTIFICATE',
  "APP_ABOUT_US_PARTNERS",
  "APP_menu-blog",
  "APP_ABOUT_US_JOB",
  "APP_PRIVACY_POLICY2",
  "APP_PRIVACY_POLICY"
] as const

type AboutCompany = typeof ABOUT_COMPANY_KEYS[number]
type CoursesKeys = typeof COURSES_KEYS[number]
type HelpKeys = typeof HELP_KEYS[number]
type PremiumKeys = typeof PREMIUM_KEYS[number]
type links = keyof typeof LINKS

interface SectionProps {
  options: AboutCompany[] |  CoursesKeys[] | HelpKeys[] | PremiumKeys[]
  title: string
}

const Section: FC<SectionProps> = ({ options, title }) => {
  const intl = useIntl()

  return (
    <section>
      <h3>{title}</h3>
      <div className={styles.list}>
        {options.map(element => {
          const intlElement = intl.formatMessage({ id: element })
          return (
            <a href={LINKS[element]} key={element}>{intlElement}</a>
          )
        })}
      </div>
    </section>
  )
}

interface SideMenuProps {
  onClose: () => void
}

export const SideMenu: FC<SideMenuProps> = ({ onClose }) => {
  const intl = useIntl()
  const downloadApp = intl.formatMessage({ id: "APP_DOWNLOAD_APP" })
  const courses = intl.formatMessage({ id: "APP_FOOTER_COURSES" })
  const premium = intl.formatMessage({ id: "APP_menu-premium" })
  const company = intl.formatMessage({ id: "APP_menu-company" })
  const help = intl.formatMessage({ id: "APP_menu-help" })


  return (
    <div className={styles.wrapper}>
      <Foco component="div" className={styles.container} onClickOutside={onClose}>
        <div className={styles.button} onClick={onClose} />
        <div className={styles.content}>

          <div className={styles.menu}>
            <Section title={courses} options={COURSES_KEYS} />
            <Section title={premium} options={PREMIUM_KEYS} />
            <Section title={company} options={ABOUT_COMPANY_KEYS} />
            <Section title={help} options={HELP_KEYS} />
          </div>

          <div className={styles.footer}>
            <h3 className={styles.title}>{downloadApp}</h3>
            <div className={styles.mobileMarkets}>
              <a
                className={classNames(styles.market, styles.apple)}
                href="https://play.google.com/store/apps/details?id=org.android.lingwing.app" />
              <a
                className={classNames(styles.market, styles.google)}
                href="https://apps.apple.com/us/app/lingwing-language-learning/id1217989755" />
            </div>
          </div>
        </div>
      </Foco>
    </div >
  )
}