import { FC } from "react";
import styles from "./SocialButton.module.scss"
import classnames from 'classnames' 

interface Props {
    social: string
}

export const SocialButton: FC<Props> = ({social}) => {
    return (
        <div className={classnames(styles.button, styles[social])}>
            <div className={classnames(styles.icon, styles[social])} />
            <div className={styles.text}> Sing in with {social.charAt(0).toUpperCase() + social.slice(1)}</div>
        </div>
    )
}