import { FC, Fragment, useState } from 'react'
import styles from './LocalesDropdown.module.scss'
import Foco from 'react-foco'
import { IconFlag } from './IconFlag'
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
  const [selectedLang, setSelectedLang] = useState<LanguageFrom>(
    LOCALES_TO_LANGUAGES[router.locale as Locale],
  )
  const [open, setOpen] = useState(false)

  const handleClick = (language: LanguageFrom) => {
    setSelectedLang(language)
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
        <IconFlag language={selectedLang} />
        {selectedLang.toUpperCase()}
        <div className={styles.arrow} />
      </div>
      {open && (
        <div className={styles.dropdownContent}>
          {LANGUAGE_FROM.map((language: LanguageFrom) => {
            return (
              <Fragment key={language}>
                {language !== selectedLang && (
                  <div
                    className={styles.option}
                    onClick={() => handleClick(language)}
                  >
                    <IconFlag language={language} />
                    <div>{LANGUAGE_NAMES[language]}</div>
                  </div>
                )}
              </Fragment>
            )
          })}
        </div>
      )}
    </Foco>
  )
}
