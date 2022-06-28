import { FC, useState } from "react"
import styles from './SwitchLanguageDropdown.module.scss'
import Foco from 'react-foco';
import { IconFlag } from "./IconFlag";
import { ShortSwitchedLanguage, SWITCHED_LANGUAGES, SwitchedLanguages } from "./languages";

export const SwitchLanguageDropdown:FC = () => {
    const [selectedLang, setSelectedLang] = useState<ShortSwitchedLanguage>("eng")
    const [open, setOpen] = useState(false)

    const handleClick = (language: ShortSwitchedLanguage) => {
        setSelectedLang(language)
        setOpen(false)
    }

    return (
        <div className={styles.dropdown} >
            <div className={styles.dropbtn} onClick={() => setOpen(!open)}>
                <IconFlag language={selectedLang} />
                {selectedLang.toUpperCase()}
                <div className={styles.arrow} />
            </div>
            {open && (
                <Foco component='div' className={styles.dropdownContent} onClickOutside={() => setOpen(false)}>
                    {SWITCHED_LANGUAGES.map((element:SwitchedLanguages) => {
                        return (
                            <>
                                {element.short !== selectedLang && 
                                    <div key={element.long} className={styles.option} onClick={() => handleClick(element.short)}>
                                        <IconFlag language={element.short} />
                                        <div>{element.long}</div>
                                    </div>
                                }
                            </>
                        )   
                    })}
                </Foco>
            )}
        </div>
    )
}

