import { FC } from "react"
import { LanguageDropdown } from "./LanguageDropdown"
import MenuButton from "./MenuButton"
import styles from './Header.module.scss'



export const Header:FC = () => {
    return (
        <div className={styles.header}>
            <MenuButton />
            
            <div className={styles.rightBlock}>
                <LanguageDropdown />
                <div className={styles.avatarBackground} />
                <div className={styles.singUp}>SING IN</div>
            </div>
        </div>
    )
}