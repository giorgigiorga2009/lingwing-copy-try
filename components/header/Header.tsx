import { FC, useState } from 'react'
import { SwitchLanguageDropdown } from './LocalesDropdown'
import style from './Header.module.scss'
import { LoginModal } from '../loginModal/LoginModal'
import { SideMenu } from './SideMenu'

import { useTranslation } from '../../utils/useTranslation'
import { useRouter } from 'next/router'
import Link from 'next/link'
import classNames from 'classnames'

interface Props {
  size?: 's' | 'm'
}

export const Header: FC<Props> = ({ size = 'm' }) => {
  const [open, setOpen] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <>
      <header className={classNames(style.header, style[size])}>
        <div className={style.leftBlock}>
          <div className={style.button} onClick={() => setIsOpen(true)} />
          <Link href="/">
            <div className={style.logo} />
          </Link>
          {isOpen && <SideMenu onClose={() => setIsOpen(false)} />}
        </div>
        <div className={style.rightBlock}>
          <SwitchLanguageDropdown />
          <div className={style.avatar} />
          <div className={style.singInButton} onClick={() => setOpen(true)}>
            {t('AUTH_LOGIN')}
          </div>
        </div>
      </header>
      {open && <LoginModal onClick={() => setOpen(false)} />}
    </>
  )
}
