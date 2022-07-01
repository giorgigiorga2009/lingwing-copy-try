import { FC, useState } from "react";
import styles from './SingModal.module.scss'
import Foco from "react-foco";
import { SocialButton } from "./SocialButton";
import classnames from 'classnames'
import { Socials } from "./SocialButton";
import { SingIn } from "./SingIn";
import { SingUp } from "./SingUp";

export const SOCIAL: Socials[] = ["facebook", "google", "twitter"]

interface Props {
  onClick: () => void
}

export const SignInModal: FC<Props> = ({ onClick }) => {
  const [tab, setTab] = useState('singin')

  return (
    <div className={styles.wrapper}>
      <Foco component='div' onClickOutside={onClick} className={styles.modal} >
        <div className={styles.modalHead}>
          <div className={classnames(styles.switch, tab === "singin" && styles.active)} onClick={() => setTab('singin')}>Sing In</div>
          <div className={classnames(styles.switch, tab === "singup" && styles.active)} onClick={() => setTab('singup')}>Sing Up</div>
          <div className={styles.close} onClick={onClick} />
        </div>
        {tab === 'singin' && <SingIn tab={tab} />}
        {tab === 'singup' && <SingUp tab={tab} />}
      </Foco>
    </div>
  )
}