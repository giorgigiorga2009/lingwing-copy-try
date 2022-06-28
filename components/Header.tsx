import { FC } from "react"
import { SwitchLanguageDropdown } from "./SwitchLanguageDropdown"
import MenuButton from "./MenuButton"
import styles from './Header.module.scss'



export const Header:FC = () => {
    return (
        <header className={styles.header}>
            <MenuButton />
            <div className={styles.rightBlock}>
                <SwitchLanguageDropdown />
                <div className={styles.avatarBackground} />
                <div className={styles.singUp}>SING IN</div>
            </div>
        </header>
    )
}