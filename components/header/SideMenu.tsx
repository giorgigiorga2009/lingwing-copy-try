import classNames from "classnames";
import { FC } from "react";
import Foco from "react-foco";
import { useIntl } from "react-intl";
import styles from './SideMenu.module.scss'

const COURSES_KEYS = ["English", "Spanish", "Georgian", "Russian", "Turkish", "Bengali"]
const HELP_KEYS = ["APP_FOOTER_FAQ", "APP_menu-contact"]
const PREMIUM_KEYS = [
  "APP_menu-student",
  "APP_menu-packages",
  "APP_menu-gift-review",
  "APP_menu-packages-coupon"
]

const ABOUT_COMPANY_KEYS = [
  'APP_ABOUT_US',
  'APP_ABOUT_CERTIFICATE',
  "APP_ABOUT_US_PARTNERS",
  "APP_menu-blog",
  "APP_ABOUT_US_JOB",
  "APP_PRIVACY_POLICY2",
  "APP_PRIVACY_POLICY"
]
interface SectionProps {
  options: string[]
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
            <span key={element}>{intlElement}</span>
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