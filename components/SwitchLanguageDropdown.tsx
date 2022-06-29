import { FC, useState } from 'react'
import styles from './SwitchLanguageDropdown.module.scss'
import Foco from 'react-foco'
import { IconFlag } from './IconFlag'
import { SwitchedLanguage, LANGUAGES, SWITCHED_LANGUAGES } from './languages'

export const SwitchLanguageDropdown: FC = () => {
  const [selectedLang, setSelectedLang] = useState<SwitchedLanguage>('eng')
  const [open, setOpen] = useState(false)

  const handleClick = (language: SwitchedLanguage) => {
    setSelectedLang(language)
    setOpen(false)
  }

  return (
    <div className={styles.dropdown}>
      <div className={styles.dropbtn} onClick={() => setOpen(!open)}>
        <IconFlag language={selectedLang} />
        {selectedLang.toUpperCase()}
        <div className={styles.arrow} />
      </div>
      {open && (
        <Foco
          component="div"
          className={styles.dropdownContent}
          onClickOutside={() => setOpen(false)}
        >
          {SWITCHED_LANGUAGES.map((element: SwitchedLanguage) => {
            return (
              <>
                {element !== selectedLang && (
                  <div
                    key={element}
                    className={styles.option}
                    onClick={() => handleClick(element)}
                  >
                    <IconFlag language={element} />
                    <div>{LANGUAGES[element]}</div>
                  </div>
                )}
              </>
            )
          })}
        </Foco>
      )}
    </div>
  )
}
