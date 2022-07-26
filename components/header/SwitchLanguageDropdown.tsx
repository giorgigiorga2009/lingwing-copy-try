import { FC, Fragment, useState } from 'react'
import styles from './SwitchLanguageDropdown.module.scss'
import Foco from 'react-foco'
import { IconFlag } from './IconFlag'
import { SwitchedLanguage, LANGUAGES, SWITCHED_LANGUAGES, LOCALES } from '../languages'
import { useRouter } from 'next/router'

export const SwitchLanguageDropdown: FC = () => {
  const [selectedLang, setSelectedLang] = useState<SwitchedLanguage>('eng')
  const [open, setOpen] = useState(false)
  const [timeStamp, setTimeStamp] = useState(0)
  const router = useRouter()

  const handleClick = (language: SwitchedLanguage) => {
    setSelectedLang(language)
    setOpen(false)
    router.push('/', '/', { locale: LOCALES[language] })
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
          {SWITCHED_LANGUAGES.map((language: SwitchedLanguage) => {
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
