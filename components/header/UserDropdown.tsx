import { FC } from 'react'
import Link from 'next/link'
import classNames from 'classnames'
import { useRouter } from 'next/router'
import style from './UserDropdown.module.scss'
import { useTranslation } from '../../utils/useTranslation'

export const UserDropdown: FC = () => {
  const router = useRouter()
  const { t } = useTranslation()

  return (
    <div className={style.dropdownContent}>
      <Link
        href={{
          pathname: `/dashboard`,
        }}
        locale={router.locale}
        as="/dashboard"
        className={style.link}
      >
        <button className={classNames(style.dashboard_btn, style.button)}>
          {t('APP_DASHBOARD')}
        </button>
      </Link>
      <button className={style.button}>{t('APP_HEADER_MENU_ITEM14')}</button>
      <button className={classNames(style.log_out_btn, style.button)}>
        {t('APP_HEADER_MENU_ITEM13')}
      </button>
    </div>
  )
}
