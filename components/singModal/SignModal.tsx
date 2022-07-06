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
  const [isSignInTab, setSignInTab] = useState(true)

  return (
    <div className={styles.wrapper}>
      <Foco component='div' onClickOutside={onClick} className={styles.modal} >
        <div className={styles.modalHead}>
          <div className={classnames(styles.switch, isSignInTab && styles.active)} onClick={() => setSignInTab(true)}>Sing In</div>
          <div className={classnames(styles.switch, !isSignInTab && styles.active)} onClick={() => setSignInTab(false)}>Sing Up</div>
          <div className={styles.close} onClick={onClick} />
        </div>
        <div className={styles.socialButtons}>
          {SOCIAL.map((element) => {
            return (
              <SocialButton key={element} isSignInTab={isSignInTab} label={element} />
            )
          })}
        </div>
        <div className={styles.divider}>
          <span className={styles.line}/>
          <span> or with </span>
          <span className={styles.line}/>
        </div>
        {isSignInTab ? <SingIn /> : <SingUp />}
      </Foco>
    </div>
  )
}