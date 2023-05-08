import { FC } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useTranslation } from '../../utils/useTranslation'
import style from './AddLanguageBtn.module.scss'

interface KaButtonStyle {
  fontFamily: string
  fontWeight: string
}

interface LinkStyle {
  textDecoration: string
}

export const AddLanguageBtn: FC = () => {
  const router = useRouter()
  const locale = router.locale ?? 'en'
  const { t } = useTranslation()

  const kaButtonStyle: KaButtonStyle = {
    fontFamily: 'bpg_arial_2009',
    fontWeight: '700',
  }
  const linkStyle: LinkStyle = {
    textDecoration: 'none',
  }
  return (
    <Link href={`/${locale}/wizard`} style={linkStyle}>
      {locale === 'ka' ? (
        <button style={kaButtonStyle} className={style.add_language_btn}>
          {t('APP_GENERAL_ADD_NEW_LANGUAGE')}
        </button>
      ) : (
        <button className={style.add_language_btn}>
          {t('APP_GENERAL_ADD_NEW_LANGUAGE')}
        </button>
      )}
    </Link>
  )
}
