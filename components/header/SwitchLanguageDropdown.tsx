import { FC, Fragment, useState } from 'react'
import styles from './SwitchLanguageDropdown.module.scss'
import Foco from 'react-foco'
import { IconFlag } from './IconFlag'
import { SwitchedLanguage, LANGUAGES, SWITCHED_LANGUAGES } from '../languages'

export const SwitchLanguageDropdown: FC = () => {
  const [selectedLang, setSelectedLang] = useState<SwitchedLanguage>('eng')
  const [open, setOpen] = useState(false)
  const [timeStamp, setTimeStamp] = useState(0)

  const handleClick = (language: SwitchedLanguage) => {
    setSelectedLang(language)
    setOpen(false)
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.button} onClick={(event) => {
        const difference = event.timeStamp - timeStamp;
        difference > 100 && setOpen(true)
      }
      }>
        <IconFlag language={selectedLang} />
        {selectedLang.toUpperCase()}
        <div className={styles.arrow} />
      </div>
      {open && (
        <Foco
          component="div"
          className={styles.dropdownContent}
          onClickOutside={(event) => {
            setTimeStamp(event.timeStamp)
            setOpen(false)
          }}
        >
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
        </Foco>
      )}
    </div>
  )
}
