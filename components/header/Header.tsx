import { FC, useState } from "react"
import { SwitchLanguageDropdown } from "./SwitchLanguageDropdown"
import styles from './Header.module.scss'
import { SignModal } from "../signModal/SignModal"
import { SideMenu } from './SideMenu'

export const Header: FC = () => {
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

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
          <div className={styles.singInButton} onClick={() => setOpen(true)} > SIGN IN </div>
        </div>
      </header>
      {open && <SignModal onClick={() => setOpen(false)} />}
    </>
  )
}