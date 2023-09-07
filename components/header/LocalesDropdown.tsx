import {
  LanguageFrom,
  LANGUAGES_TO_LOCALES,
  LANGUAGE_FROM,
  LANGUAGE_NAMES,
  LOCALES_TO_LANGUAGES,
} from '@utils/languages'
import Foco from 'react-foco'
import { useRouter } from 'next/router'
import { LocaleFlag } from './LocaleFlag'
import { Locale } from '@utils/localization'
import { FC, Fragment, useState } from 'react'
import style from './LocalesDropdown.module.scss'

export const LocalesDropdown: FC = () => {
  const router = useRouter()
  const initialLanguage = LOCALES_TO_LANGUAGES[router.locale as Locale]

  const [selected, setSelected] = useState<LanguageFrom>(initialLanguage)
  const [open, setOpen] = useState(false)

  const handleClick = (language: LanguageFrom) => {
    setSelected(language)
    setOpen(false)
    const page = router.asPath
    router.push(page, page, { locale: LANGUAGES_TO_LOCALES[language] })
  }

  return (
    <Foco
      component="div"
      onClickOutside={() => setOpen(false)}
      className={style.dropdown}
    >
      <button className={style.button} onClick={() => setOpen(!open)}>
        <LocaleFlag language={selected} />
        <h6>{selected.toUpperCase()}</h6>
        <div className={style.arrow} />
      </button>
      {open && (
        <div className={style.dropdownContent}>
          {LANGUAGE_FROM.map((language: LanguageFrom) => (
            <Fragment key={language}>
              {language !== selected && (
                <button
                  className={style.option}
                  onClick={() => handleClick(language)}
                >
                  <LocaleFlag language={language} />
                  <div>{LANGUAGE_NAMES[language]}</div>
                </button>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </Foco>
  )
}
