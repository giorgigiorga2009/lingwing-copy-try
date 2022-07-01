import { FC } from "react";
import styles from "./SocialButton.module.scss"
import classnames from 'classnames'

export type Socials = 'facebook' | 'twitter' | 'google'

interface Props {
    label: Socials
    tab: string
}

export const SocialButton: FC<Props> = ({ label, tab }) => {
    return (
        <div className={classnames(styles.button, styles[label])}>
            <div className={classnames(styles.icon, styles[label])} />
            {tab === 'singin' ? <div className={styles.text}> Sing in with {label.charAt(0).toUpperCase() + label.slice(1)}</div> :
                <div className={styles.text}> Sing up with {label.charAt(0).toUpperCase() + label.slice(1)}</div>}
        </div>
    )
}