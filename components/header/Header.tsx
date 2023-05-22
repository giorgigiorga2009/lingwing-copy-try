import { FC, useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import User from './User'
import { LocalesDropdown } from './LocalesDropdown'
import style from './Header.module.scss'
import { LoginModal } from '../loginWindow/LoginModal'
import { SideMenu } from './SideMenu'
import { useTranslation } from '../../utils/useTranslation'
import Link from 'next/link'
import classNames from 'classnames'
import axios from 'axios'

// import { getUserProfileData } from '../../utils/auth'

interface Props {
  size?: 's' | 'm'
  loginClassName?: string
}

export const Header: FC<Props> = ({ size = 'm', loginClassName }) => {
  const router = useRouter()
  const [openLogin, setOpenLogin] = useState(false)
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [profileData, setProfileData] = useState<any>([])

  const { t } = useTranslation()
  const HEADERS = {
    'Content-Type': 'application/json;charset=UTF-8',
    Accept: 'application/json, text/plain, */*',
  }
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('authToken') as string
      const logined = token !== null
      // if (logined) {
      //   axios({
      //     url: `${process.env.defaultURL}/user/profile?lang=eng`,
      //     headers: {
      //       ...HEADERS,
      //       Authorization: token,
      //     },
      //   })
      //     .then(response => setProfileData(response))
      //     .catch(err => console.log(err))
      // }

      setIsAuthenticated(logined)
      // console.log(profileData, 'profile data')
    }
  }, [])

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
