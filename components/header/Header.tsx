import User from './User'
import Link from 'next/link'
import classNames from 'classnames'
import { SideMenu } from './SideMenu'
import style from './Header.module.scss'
import { FC, useState, useEffect } from 'react'
import { LocalesDropdown } from './LocalesDropdown'
import { LoginModal } from '../loginWindow/LoginModal'
import { useTranslation } from '@utils/useTranslation'

import { getUserProfileData } from '../../utils/auth'

interface Props {
  size?: 's' | 'm'
  loginClassName?: string
}

export const Header: FC<Props> = ({ size = 'm', loginClassName }) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [profileData, setProfileData] = useState<any[]>([])

  const { t } = useTranslation()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('authToken') as string
      const logined = token !== null

      // if (logined) {
      //   saveProfileData(token)
      // }

      setIsAuthenticated(logined)
      console.log(logined, 'logined')
    }
  }, [])

  // const saveProfileData = (token) => {
  //  return getUserProfileData(token).then((response: any) =>
  //   setProfileData(response)
  // )
  // }

  return (
    <header className={classNames(style.header, style[size])}>
      <div className={style.leftBlock}>
        <div className={style.button} onClick={() => setOpenSideMenu(true)} />
        <Link href="/" className={style.logo_link}>
          <div className={style.logo} />
        </Link>

        {openSideMenu && <SideMenu onClose={() => setOpenSideMenu(false)} />}
      </div>

      <div className={style.rightBlock}>
        <LocalesDropdown />
        {!isAuthenticated ? (
          <div className={style.authorization_box}>
            <div className={style.avatar} />
            <div
              className={style.singInButton}
              onClick={() => setOpenLogin(true)}
            >
              {t('loginSignIn')}
            </div>
          </div>
        ) : (
          <div className={style.user_box}>
            <User />
          </div>
        )}
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
