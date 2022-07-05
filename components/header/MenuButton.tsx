import { FC, useState } from 'react'
import styles from './MenuButton.module.scss'
import classnames from 'classnames'
import Foco from 'react-foco'

const COURSES = ["English", "Spanish", "Georgian", "Russian", "Turkish", "Bengali"]
const ABOUT_COMPANY = ["Why with Us", "Certificate", "Partners", "Blog", "Jobs", "License Agreement", "Privacy Policy"]
const PREMIUM = ["Entrant", "Prices", "Buy a gift", "Coupon activation"]
const HELP = ["FAQ", "Contact us"]

interface SectionProps {
  options: string[]
  title: string
}

const Section: FC<SectionProps> = ({ options, title }) => {
  return (
    <section>
      <h1>{title}</h1>
      <div className={styles.list}>
        {options.map(element => (
          <span key={element}>{element}</span>
        ))}
      </div>
    </section>
  )
}

const MenuButton: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.menuContainer}>
      <div className={classnames(styles.button, styles.lines)} onClick={() => setOpen(true)} > ☰ </div>
      <a className={styles.link} href="https://lingwing.com/en/">
        <div className={styles.lingwingLogo} />
      </a>
      {open && (
        <div className={styles.wrapper} >
          <Foco component="div" className={styles.menuContent} onClickOutside={() => setOpen(false)}>
            <div className={classnames(styles.button, styles.cross)} onClick={() => setOpen(false)}>✕ </div>
            <div className={styles.column}>
              <Section title="Courses" options={COURSES} />
              <Section title="Premium" options={PREMIUM} />
            </div>
            <div className={styles.column}>
              <Section title="Company" options={ABOUT_COMPANY} />
              <Section title="Help" options={HELP} />
            </div>
            <div className={styles.footer}>
              <h1>Download Lingwing app</h1>
              <div className={styles.mobileMarkets}>
                <div className={classnames(styles.market, styles.apple)} />
                <div className={classnames(styles.market, styles.google)} />
              </div>
            </div>
          </Foco>
        </div >
      )}
    </div >
  )
}

export default MenuButton