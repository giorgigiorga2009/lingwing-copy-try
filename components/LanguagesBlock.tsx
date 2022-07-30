import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { useIntl } from 'react-intl'
import { LANGUAGES, LearnedLanguage, LEARNED_LANGUAGES } from '../utils/languages'
import { useTranslation } from '../utils/useTranslation'
import style from './LanguagesBlock.module.scss'

interface Props {
  language: LearnedLanguage
}

const LanguageTile: FC<Props> = ({ language }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Link href={`${router.locale === 'en' ? 'en' : ''}/wizard/${language}`} locale={router.locale} >
      <div className={classNames(style.tileContainer, style[language])}>
        <span className={style.start}>{t("WIZARD_START_BUTTON")}</span>
        <span className={style.title}>{t(LANGUAGES[language])}</span>
        <span className={style.languageFlag} />
        <span className={style.parrot} />
      </div>
    </Link>
  )
}

export const LanguagesBlock: FC = () => {
  return (
    <div className={style.block}>
      {LEARNED_LANGUAGES.map(language => (
        <LanguageTile language={language} key={language} />
      ))}
    </div>
  )
}
