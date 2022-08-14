import { FC, Fragment, useState } from 'react'
import styles from './LocalesDropdown.module.scss'
import Foco from 'react-foco'
import { LocaleFlag } from './LocaleFlag'
import {
  LanguageFrom,
  LANGUAGES_TO_LOCALES,
  LANGUAGE_FROM,
  LANGUAGE_NAMES,
  LOCALES_TO_LANGUAGES,
} from '../../utils/languages'
import { useRouter } from 'next/router'
import { Locale } from '../../utils/localization'

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
      className={styles.dropdown}
    >
      <div className={styles.button} onClick={() => setOpen(!open)}>
        <LocaleFlag language={selected} />
        {selected.toUpperCase()}
        <div className={styles.arrow} />
      </div>
      {open && (
        <div className={styles.dropdownContent}>
          {LANGUAGE_FROM.map((language: LanguageFrom) => (
            <Fragment key={language}>
              {language !== selected && (
                <div
                  className={styles.option}
                  onClick={() => handleClick(language)}
                >
                  <LocaleFlag language={language} />
                  <div>{LANGUAGE_NAMES[language]}</div>
                </div>
              )}
            </Fragment>
          ))}
        </div>
      )}
    </Foco>
  )
}
