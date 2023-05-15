import Link from 'next/link'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { SideMenu } from './SideMenu'
import style from './Header.module.scss'
import { LocalesDropdown } from './LocalesDropdown'
import { LoginModal } from '../loginWindow/LoginModal'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  size?: 's' | 'm'
  loginClassName?: string
}

export const Header: FC<Props> = ({ size = 'm', loginClassName }) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const { t } = useTranslation()

  return (
    <header className={classNames(style.header, style[size])}>
      <div className={style.leftBlock}>
        <div className={style.button} onClick={() => setOpenSideMenu(true)} />
        <Link href="/">
          <div className={style.logo} />
        </Link>
        {openSideMenu && <SideMenu onClose={() => setOpenSideMenu(false)} />}
      </div>

      <div className={style.rightBlock}>
        <LocalesDropdown />
        <div className={style.avatar} />
        <div className={style.singInButton} onClick={() => setOpenLogin(true)}>
          {t('loginSignIn')}
        </div>
      </div>
      {openLogin && (
        <LoginModal
          openLogin={openLogin}
          setOpenLogin={setOpenLogin}
          onClick={() => setOpenLogin(false)}
          className={loginClassName}
        />
      )}
    </header>
  )
}
