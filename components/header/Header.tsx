import User from './User'
import Link from 'next/link'
import classNames from 'classnames'
import { SideMenu } from './SideMenu'
import { useRouter } from 'next/router'
import style from './Header.module.scss'
import { useSession } from 'next-auth/react'
import UserAvatar from '../shared/UserAvatar'
import { FC, useState, useEffect } from 'react'
import { LocalesDropdown } from './LocalesDropdown'
import { useUserStore, UserInfo } from '@utils/store'
import { CourseObject } from '@utils/lessons/getTask'
import { LoginModal } from '../loginWindow/LoginModal'
import { useTranslation } from '@utils/useTranslation'

interface Props {
  size?: 's' | 'm'
  loginClassName?: string
  currentCourseObject?: CourseObject
  token?: string | null
  setShowTopScores: (show: boolean) => void
  showTopScores: boolean
}

const setUserToken = (state: UserInfo) => ({
  SetToken: state.SetToken,
})

export const Header: FC<Props> = ({
  size = 'm',
  loginClassName,
  currentCourseObject,
  token,
  setShowTopScores,
  showTopScores,
}) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [openSideMenu, setOpenSideMenu] = useState(false)
  const { SetToken } = useUserStore(setUserToken)

  const router = useRouter()
  const { t } = useTranslation()
  const { data: session } = useSession()
  const isLessons = router.pathname.includes('lessons')
  const isDashboard = router.pathname.includes('dashboard')

  useEffect(() => {
    if (session) {
      SetToken(session.user.accessToken)
    }
  }, [session, SetToken])

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
        <SideMenu
          onClose={() => setOpenSideMenu(false)}
          openSideMenu={openSideMenu}
          lessonsPage={isLessons ? true : false}
          currentCourseObject={currentCourseObject}
          token={token}
        />
      </div>
      <div className={style.rightBlock}>
        <LocalesDropdown />
        {session ? (
          <>
            {!isDashboard && !isLessons && (
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
            {isLessons ? (
              <>
                <button
                  className={style.topScoresBtn}
                  onClick={() => setShowTopScores(!showTopScores)}
                />
                <Link
                  href={{
                    pathname: `/dashboard`,
                  }}
                  locale={router.locale}
                  as="/dashboard"
                  className={classNames(style.exit, style.link)}
                ></Link>
              </>
            ) : (
              <User />
            )}
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
