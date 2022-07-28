import { FC, useState } from "react"
import { SwitchLanguageDropdown } from "./SwitchLanguageDropdown"
import style from './Header.module.scss'
import { LoginModal } from "../loginModal/LoginModal"
import { SideMenu } from './SideMenu'
import { useIntl } from "react-intl";
import classNames from "classnames"

interface Props {
  size?: 's' | 'm'
}

export const Header: FC<Props> = ({size: color = 'm'}) => {
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)

  const intl = useIntl()
  const signIn = intl.formatMessage({ id: "AUTH_LOGIN" })

  return (
    <>
      <header className={classNames(style.header, style[color])}>
        <div className={style.leftBlock}>
          <div className={style.button} onClick={() => setIsOpen(true)} />
          <a className={style.logo} href="https://lingwing.com/en/" />
          {isOpen && <SideMenu onClose={() => setIsOpen(false)}/>}
        </div >
        <div className={style.rightBlock}>
          <SwitchLanguageDropdown />
          <div className={style.avatar} />
          <div className={style.singInButton} onClick={() => setOpen(true)}>{signIn}</div>
        </div>
      </header>
      {open && <LoginModal onClick={() => setOpen(false)} />}
    </>
  )
}