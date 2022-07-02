import { FC } from "react";
import styles from "./SocialButton.module.scss"
import classnames from 'classnames'

export type Socials = 'facebook' | 'twitter' | 'google'

interface Props {
    label: Socials
    isSignInTab: boolean
}

export const SocialButton: FC<Props> = ({ label, isSignInTab}) => {
    return (
        <div className={classnames(styles.button, styles[label])}>
            <div className={classnames(styles.icon)} />
            <div className={styles.text}> Sing {isSignInTab ? 'in' : 'up'} with <span>{ label }</span></div>
        </div>
    )
}