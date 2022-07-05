import { FC, useState } from "react"
import { SwitchLanguageDropdown } from "./SwitchLanguageDropdown"
import MenuButton from "./MenuButton"
import styles from './Header.module.scss'
import { SignInModal } from "../singModal/SignModal"

export const Header: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <header className={styles.header}>
        <MenuButton />
        <div className={styles.rightBlock}>
          <SwitchLanguageDropdown />
          <div className={styles.avatar} />
          <div className={styles.singInButton} onClick={() => setOpen(true)} > SIGN IN </div>
        </div>
      </header>
      {open && <SignInModal onClick={() => setOpen(false)} />}
    </>
  )
}