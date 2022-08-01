import { FC, Fragment, useState } from 'react'
import styles from './SwitchLanguageDropdown.module.scss'
import Foco from 'react-foco'
import { IconFlag } from './IconFlag'
import { Locale, LANGUAGES, LOCALES, LANGUAGES_TO_LOCALES, LOCALES_TO_LANGUAGES, Locale } from '../../utils/languages'
import { useRouter } from 'next/router'

export const SwitchLanguageDropdown: FC = () => {
  const router = useRouter()
  const [selectedLang, setSelectedLang] = useState<Locale>(
    LOCALES_TO_LANGUAGES[router.locale as Locale]
  )
  const [open, setOpen] = useState(false)


  const handleClick = (language: Locale) => {
    setSelectedLang(language)
    setOpen(false)
    const page = router.asPath
    router.push(page, page, { locale: LANGUAGES_TO_LOCALES[language] })
  }

  return (
    <Foco component="div" onClickOutside={() => setOpen(false)} className={styles.dropdown}>
      <div className={styles.button} onClick={() => setOpen(!open)}>
        <IconFlag language={selectedLang} />
        {selectedLang.toUpperCase()}
        <div className={styles.arrow} />
      </div>
      {open && (
        <div className={styles.dropdownContent}>
          {LOCALES.map((language: Locale) => {
            return (
              <Fragment key={language}>
                {language !== selectedLang && (
                  <div
                    className={styles.option}
                    onClick={() => handleClick(language)}
                  >
                    <IconFlag language={language} />
                    <div>{LANGUAGES[language]}</div>
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
