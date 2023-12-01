import User from './User'
import Link from 'next/link'
import Foco from 'react-foco'
import classNames from 'classnames'
import { SideMenu } from './SideMenu'
import { useRouter } from 'next/router'
import style from './Header.module.scss'
import UserAvatar from '../shared/UserAvatar'
import { FC, useState } from 'react'

import { LocalesDropdown } from './LocalesDropdown'
import { LoginModal } from '../loginWindow/LoginModal'
import { useTranslation } from '@utils/useTranslation'
import { useSession } from 'next-auth/react'
import { CourseObject } from '@utils/lessons/getTask'
//import Ratings from '@components/lessons/usersRating/Ratings'

interface Props {
  size?: 's' | 'm'
  loginClassName?: string
  currentCourseObject?: CourseObject
  token?: string | null
  setShowTopScores: (show: boolean) => void
  showTopScores: boolean
}

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
  // const [showTopScores, setShowTopScores] = useState(false)

  const { t } = useTranslation()
  const router = useRouter()
  const { data: session } = useSession()
  const isDashboard = router.pathname.includes('dashboard')
  const isLessons = router.pathname.includes('lessons')

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
        {/* {openSideMenu && ( */}
        <SideMenu
          onClose={() => setOpenSideMenu(false)}
          openSideMenu={openSideMenu}
          lessonsPage={isLessons ? true : false}
          currentCourseObject={currentCourseObject}
          token={token}
        />
        {/* {showTopScores && currentCourseObject && (
          <Foco
            component="div"
            onClickOutside={() => setShowTopScores(false)}
            className={classNames(style.topScoresContainer)}
          >
            <Ratings
              userCourseId={currentCourseObject?._id}
              courseId={currentCourseObject?.course._id}
              token={token}
            />
          </Foco>
        )} */}
        {/* )} */}
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
