import { FC, useState } from 'react'
import styles from './MenuButton.module.scss'
import classnames from 'classnames'

const COURSES = ["English", "Spanish", "Georgian", "Russian", "Turkish", "Bengali"]
const ABOUT_COMPANY = ["Why with Us", "Certificate", "Partners", "Blog", "Jobs", "License Agreement", "Privacy Policy"]
const PREMIUM = ["Entrant", "Prices", "Buy a gift", "Coupon activation"]
const HELP = ["FAQ", "Contact us"]

interface SectionProps  {
    options: string[]
    title: string
}

const Section: FC<SectionProps> = ({options, title}) => {
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
            <div className={classnames(styles.button, open ? styles.cross : styles.lines)} onClick={() => setOpen(!open)} />  
            <a className={styles.link} href="https://lingwing.com/en/" >
                <img
                    className={styles.lingwingLogo}
                    src="/assets/themes/images/v1/svg/logo-light.svg"
                />
            </a>
            {open && (
                <div className={styles.menuContent}>
                    <div className={styles.column}>
                        <Section title="Courses" options={COURSES}  />
                        <Section title="Premium" options={PREMIUM}  />
                    </div>
                    <div className={styles.column}>
                        <Section title="Company" options={ABOUT_COMPANY}  />
                        <Section title="Help" options={HELP}  />
                    </div>
                </div>
            )}   
        </div>
    )
}




export default MenuButton