import { FC, useState } from 'react'
import { LocalesDropdown } from './LocalesDropdown'
import style from './Header.module.scss'
import { LoginModal } from '../loginModal/LoginModal'
import { SideMenu } from './SideMenu'
import { useTranslation } from '../../utils/useTranslation'
import Link from 'next/link'
import classNames from 'classnames'

interface Props {
  size?: 's' | 'm'
}

export const Header: FC<Props> = ({ size = 'm' }) => {
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { t } = useTranslation()

  return (
    <header className={classNames(style.header, style[size])}>
      <div className={style.leftBlock}>
        <div className={style.button} onClick={() => setIsOpen(true)} />
        <Link href="/">
          <div className={style.logo} />
        </Link>
        {isOpen && <SideMenu onClose={() => setIsOpen(false)} />}
      </div>
      <div className={style.rightBlock}>
        <LocalesDropdown />
        <div className={style.avatar} />
        <div className={style.singInButton} onClick={() => setOpen(true)}>
          {t('AUTH_LOGIN')}
        </div>
      </div>
      {open && <LoginModal onClick={() => setOpen(false)} />}
    </header>
  )
}
