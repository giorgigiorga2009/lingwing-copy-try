import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from '../../utils/useTranslation'
import style from './AddLanguageBtn.module.scss'

interface LinkStyle {
  textDecoration: string
}

export const AddLanguageBtn: FC = () => {
  const router = useRouter()
  const locale = router.locale ?? 'en'
  const { t } = useTranslation()

  const linkStyle: LinkStyle = {
    textDecoration: 'none',
  }
  return (
    <Link href={`/${locale}/wizard`} style={linkStyle}>
      <button className={style.add_btn}>
        {t('APP_GENERAL_ADD_NEW_LANGUAGE')}
      </button>
    </Link>
  )
}
