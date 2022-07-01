import { FC, useState } from "react";
import styles from './SingInModal.module.scss'
import Foco from "react-foco";
import { SocialButton } from "./SocialButton";
import classnames from 'classnames'

const SOCIAL = ["facebook", "google", "twitter"]

interface Props {
    onClick: () => void
}

export const SignInModal: FC<Props> = ({ onClick }) => {
    const [tab, setTab] = useState('in')

    return (
        <div className={styles.wrapper}>
            <Foco component='div' onClickOutside={onClick} className={classnames(styles.modal, tab === 'up' && styles.up )} >
                <div className={styles.modalHead}>
                    <div className={classnames(styles.switch, tab === "in" && styles.active )} onClick={() => setTab('in')}>Sing In</div>
                    <div className={classnames(styles.switch, tab === "up" && styles.active )} onClick={() => setTab('up')}>Sing Up</div>
                    <div className={styles.close} onClick={onClick} />
                </div>
                <div className={styles.socialButtons}>
                    {SOCIAL.map((element) => {
                        return (
                            <SocialButton social={element} />
                        )
                    })}
                </div>
                <div className={styles.divider}>
                    <span className={styles.line}> ――― </span>
                    <span> or with </span>
                    <span className={styles.line}> ――― </span>
                </div>
                <div className={styles.form}>
                    <input className={styles.input} type="email" name="email" placeholder="E-mail" pattern="/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"></input>
                    <input className={styles.input} type="password" name="password" placeholder="Password"></input>
                </div>
                <div className={classnames(styles.button, tab === "in" ? styles.in : styles.up )} />
                <div className={styles.forgot}>Forgot <span className={styles.link}>Password?</span> </div>
                {tab === "up" && (
                    <div className={styles.agreement}> By registering, you agree to the terms of the <span className={styles.link}>License Agreement</span> and the <span className={styles.link}> Privacy Policy</span></div>
                )}
            </Foco>
        </div>
    )
}