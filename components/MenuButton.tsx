import { FC } from 'react'
import styles from './MenuButton.module.scss'

 const MenuButton: FC = () => {
    return (
        <div className={styles.menuButton}>
            <div className={styles.button} >  ☰ </div>
            <a className={styles.link} href="https://lingwing.com/en/" >
                <img
                className={styles.lingwingLogo}
                src="https://lingwing.com/themes/images/v1/svg/logo-light.svg"
                alt="example"
                />
            </a>   
        </div>
    )
}

export default MenuButton