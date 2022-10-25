import { FC, useState } from 'react'
import { LocalesDropdown } from './LocalesDropdown'
import style from './Header.module.scss'
import { LoginModal } from '../loginWindow/LoginModal'
import { SideMenu } from './SideMenu'
import { useTranslation } from '../../utils/useTranslation'
import Link from 'next/link'
import classNames from 'classnames'
import { LocaleFlag } from './LocaleFlag'
import Timer from './Timer'

interface Props {
  size?: 's' | 'm'
  loginClassName?: string
  variant?: 'task'
  timerTrigger?: boolean
}

export const Header: FC<Props> = ({
  size = 'm',
  loginClassName,
  variant,
  timerTrigger,
}) => {
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
      {variant && (
        <>
          <div className={style.taskButton}>
            <LocaleFlag language="eng" />
            <div className={style.label}>English A1-1</div>
            <div className={style.arrow} />
          </div>
          <Timer trigger={timerTrigger} />
        </>
      )}
      <div className={style.rightBlock}>
        <LocalesDropdown />
        <div className={style.avatar} />
        <div className={style.singInButton} onClick={() => setOpenLogin(true)}>
          {t('loginSignIn')}
        </div>
      </div>
      {openLogin && (
        <LoginModal
          onClick={() => setOpenLogin(false)}
          className={loginClassName}
        />
      )}
    </header>
  )
}
