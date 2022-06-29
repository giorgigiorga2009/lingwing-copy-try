import { FC, useState } from "react";
import styles from './SingInModal.module.scss'
import Foco from "react-foco";

interface Props {
    onClick: () => void
}

export const SignInModal: FC<Props> = ({onClick}) => {

    return (
        <div className={styles.wrapper}>
            <Foco component='div' onClickOutside={onClick} className={styles.modal} >
                <div className={styles.modalHead}>
                    <div className={styles.switch}>Sing Up</div>
                    <div className={styles.switch}>Sing Up</div>
                    <div className={styles.close} onClick={onClick} />
                </div>
                <div className={styles.socialButtons}>
                    <div className={styles.facebook}>
                        <div className={styles.iconFacebook} />
                        <div className={styles.text}></div>
                    </div>
                    <div className={styles.google}>
                        <div className={styles.iconGoogle} />
                        <div className={styles.text}></div>
                    </div>
                    <div className={styles.twitter}>
                        <div className={styles.iconTwitter} />
                        <div className={styles.text}></div>
                    </div>
                </div>
            </Foco>
        </div>  
    )
}