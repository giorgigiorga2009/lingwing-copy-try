import classNames from 'classnames'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { FC } from 'react'
import { LANGUAGE_NAMES, LanguageTo, LANGUAGES_TO } from '../utils/languages'
import { useTranslation } from '../utils/useTranslation'
import style from './LanguagesBlock.module.scss'

interface Props {
  language: LanguageTo
}

const LanguageTile: FC<Props> = ({ language }) => {
  const { t } = useTranslation()
  const router = useRouter()

  return (
    <Link
      href={{
        pathname: `/wizard`,
        query: { languageTo: language },
      }}
      locale={router.locale}
      as="/wizard"
    >
      <div className={classNames(style.tileContainer, style[language])}>
        <span className={style.start}>{t('WIZARD_START_BUTTON')}</span>
        <span className={style.title}>{t(LANGUAGE_NAMES[language])}</span>
        <span className={style.languageFlag} />
        <span className={style.parrot} />
      </div>
    </Link>
  )
}

export const LanguagesBlock: FC = () => {
  return (
    <div className={style.block}>
      {LANGUAGES_TO.map(language => (
        <LanguageTile language={language} key={language} />
      ))}
    </div>
  )
}
