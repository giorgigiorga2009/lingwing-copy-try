import classNames from "classnames";
import { FC } from "react";
import Foco from "react-foco";
import style from './SideMenu.module.scss'

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
      <h3>{title}</h3>
      <div className={style.list}>
        {options.map(element => (
          <span key={element}>{element}</span>
        ))}
      </div>
    </section>
  )
}

interface SideMenuProps {
  onClose: () => void
}

export const SideMenu: FC<SideMenuProps> = ({ onClose }) => {
  return (
    <div className={style.wrapper}>
      <Foco component="div" className={style.menuContent} onClickOutside={onClose}>
        <div className={style.button} onClick={onClose}/>

        <div className={style.row}>
          <Section title="Courses" options={COURSES} />
          <Section title="Premium" options={PREMIUM} />
        </div>
        <div className={style.row}>
          <Section title="Company" options={ABOUT_COMPANY} />
          <Section title="Help" options={HELP} />
        </div>
        <div className={style.footer}>
          <h3 className={style.title}>Download Lingwing app</h3>
          <div className={style.mobileMarkets}>
            <a className={classNames(style.market, style.apple)} href="https://play.google.com/store/apps/details?id=org.android.lingwing.app" /> 
            <a className={classNames(style.market, style.google)} href="https://apps.apple.com/us/app/lingwing-language-learning/id1217989755" />
          </div>
        </div>
      </Foco>
    </div >
  )
}