import { FC, useState } from "react"
import styles from './LanguageDropdown.module.scss'
import Foco from 'react-foco';
import { IconFlag, Lang, LANG, ShortLang } from "./IconFlag";

export const LanguageDropdown:FC = () => {
    const [selectedLang, setSelectedLang] = useState<ShortLang>("eng")
    const [open, setOpen] = useState(false)

    const handleClick = (lang:ShortLang) => {
        setSelectedLang(lang)
        setOpen(false)
    }

    return (
        <div className={styles.dropdown} >
            <div className={styles.dropbtn} onClick={() => setOpen(!open)}>
                <IconFlag lang={selectedLang} />
                {selectedLang.toUpperCase()}
            </div>
            {open && (
                <Foco component='div' className={styles.dropdownContent} onClickOutside={() => setOpen(false)}>
                    {LANG.map((element:Lang) => {
                        return (
                            <>
                                {element.short !== selectedLang && 
                                    <div key={element.long} className={styles.option} onClick={() => handleClick(element.short)}>
                                        <IconFlag lang={element.short} />
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

