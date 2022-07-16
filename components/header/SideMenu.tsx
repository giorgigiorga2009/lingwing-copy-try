import classNames from "classnames";
import { FC } from "react";
import Foco from "react-foco";
import { useIntl } from "react-intl";
import styles from './SideMenu.module.scss'

const COURSES = ["English", "Spanish", "Georgian", "Russian", "Turkish", "Bengali"]
const ABOUT_COMPANY = ["Why with Us", "Certificate", "Partners", "Blog", "Jobs", "License Agreement", "Privacy Policy"]
const PREMIUM = ["Entrant", "Prices", "Buy a gift", "Coupon activation"]
const HELP = ["FAQ", "Contact us"]

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
          const intlElement = intl.formatMessage({id: element})
          return (
          <span key={element}>{intlElement}</span>
)})}
      </div>
    </section>
  )
}

interface SideMenuProps {
  onClose: () => void
}

export const SideMenu: FC<SideMenuProps> = ({ onClose }) => {

  return (
    <div className={styles.wrapper}>
      <Foco component="div" className={styles.container} onClickOutside={onClose}>
        <div className={styles.button} onClick={onClose} />
        <div className={styles.content}>

          <div className={styles.menu}>
            <Section title="Courses" options={COURSES} />
            <Section title="Premium" options={PREMIUM} />
            <Section title="Company" options={ABOUT_COMPANY_KEYS} />
            <Section title="Help" options={HELP} />
          </div>

          <div className={styles.footer}>
            <h3 className={styles.title}>Download Lingwing app</h3>
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