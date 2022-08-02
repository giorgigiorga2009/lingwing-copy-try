import { FC, useState } from "react"
import { SwitchLanguageDropdown } from "./LocalesDropdown"
import style from './Header.module.scss'
import { LoginModal } from "../loginModal/LoginModal"
import { SideMenu } from './SideMenu'
import classNames from "classnames"
import { useTranslation } from "../../utils/useTranslation"

interface Props {
  size?: 's' | 'm'
}

export const Header: FC<Props> = ({size = 'm'}) => {
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const {t} = useTranslation()

  return (
    <>
      <header className={classNames(style.header, style[size])}>
        <div className={style.leftBlock}>
          <div className={style.button} onClick={() => setIsOpen(true)} />
          <a className={style.logo} href="https://lingwing.com/en/" />
          {isOpen && <SideMenu onClose={() => setIsOpen(false)}/>}
        </div >
        <div className={style.rightBlock}>
          <SwitchLanguageDropdown />
          <div className={style.avatar} />
          <div className={style.singInButton} onClick={() => setOpen(true)}>
            {t("AUTH_LOGIN")}
          </div>
        </div>
      </header>
      {open && <LoginModal onClick={() => setOpen(false)} />}
    </>
  )
}