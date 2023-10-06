import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import { signOut } from 'next-auth/react'
import style from './UserDropdown.module.scss'
import { useTranslation } from '@utils/useTranslation'

export const UserDropdown: FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className={style.dropdownContent}>
      <Link
        href={{ pathname: `/dashboard` }}
        locale={router.locale}
        as="/dashboard"
        className={style.link}
      >
        <div className={classNames(style.dashboard_btn, style.button)}>
          {t('APP_DASHBOARD')}
        </div>
      </Link>
      <Link
        href={{ pathname: `/profile` }}
        locale={router.locale}
        as="/profile"
        className={style.link}
      >
        <div className={classNames(style.button)}>
          {t('APP_HEADER_MENU_ITEM14')}
        </div>
      </Link>
      <Link
        href={{ pathname: '/logout' }}
        onClick={() => signOut({ redirect: false })}
      >
        <div className={classNames(style.log_out_btn, style.button)}>
          {t('APP_HEADER_MENU_ITEM13')}
        </div>
      </Link>
    </div>
  )
}
