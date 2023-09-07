import User from './User'
import Link from 'next/link'
import classNames from 'classnames'
import { SideMenu } from './SideMenu'
import { useRouter } from 'next/router'
import style from './Header.module.scss'
import UserAvatar from '../shared/UserAvatar'
import { FC, useState, useEffect } from 'react'
import { LocalesDropdown } from './LocalesDropdown'
import { LoginModal } from '../loginWindow/LoginModal'
import { useTranslation } from '@utils/useTranslation'

import loggers from '@components/loggers'

//import { useSession, signIn, signOut } from 'next-auth/react'


interface Props {
  size?: 's' | 'm'
  loginClassName?: string
}

export const Header: FC<Props> = ({ size = 'm', loginClassName }) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const { t } = useTranslation()
  const router = useRouter()
  // const { data: session } = useSession()

  useEffect(() => {
    if (typeof window !== 'undefined') {
      loggers.logError(console.error);
      const token = window.localStorage.getItem('authToken') as string
      const logined = token !== null
      setIsAuthenticated(logined)
    }
  }, [])

  const isDashboard = router.pathname.includes('dashboard')

  return (
    <header className={classNames(style.header, style[size])}>
      <div className={style.leftBlock}>
        <button
          className={style.button}
          onClick={() => setOpenSideMenu(true)}
        />
        <Link href="/" className={style.logo_link}>
          <div className={style.logo} />
        </Link>
        {openSideMenu && <SideMenu onClose={() => setOpenSideMenu(false)} />}
      </div>
      <div className={style.rightBlock}>
        <LocalesDropdown />
        {/* </div>{session ? ( */}
        {isAuthenticated ? (
          <>
            {!isDashboard && (
              <Link
                href={{
                  pathname: `/dashboard`,
                }}
                locale={router.locale}
                as="/dashboard"
                className={classNames(style.dashboard, style.link)}
              >
                <h4>{t('APP_DASHBOARD')}</h4>
              </Link>
            )}
            <User />
          </>
        ) : (
          <div className={style.authorization_box}>
            <UserAvatar />
            <button
              className={style.singInButton}
              onClick={() => setOpenLogin(true)}
            >
              {t('AUTH_SIGN_IN')}
            </button>
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
