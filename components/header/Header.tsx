import { FC, useState } from "react"
import { SwitchLanguageDropdown } from "./SwitchLanguageDropdown"
import styles from './Header.module.scss'
import { LoginModal } from "../loginModal/LoginModal"
import { SideMenu } from './SideMenu'
import { useIntl } from "react-intl";

export const Header: FC = () => {
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const intl = useIntl()
  const signIn = intl.formatMessage({ id: "AUTH_LOGIN" })

  return (
    <>
      <header className={styles.header}>
        <div className={styles.leftBlock}>
          <div className={styles.button} onClick={() => setIsOpen(true)} />
          <a className={styles.logo} href="https://lingwing.com/en/" />
          {isOpen && <SideMenu onClose={() => setIsOpen(false)}/>}
        </div >
        <div className={styles.rightBlock}>
          <SwitchLanguageDropdown />
          <div className={styles.avatar} />
          <div className={styles.singInButton} onClick={() => setOpen(true)}>{signIn}</div>
        </div>
      </header>
      {open && <LoginModal onClick={() => setOpen(false)} />}
    </>
  )
}