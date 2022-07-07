import { FC, useState } from "react";
import style from './LoginModal.module.scss'
import Foco from "react-foco";
import { NetworkButtons } from "./NetworkButtons";
import classnames from 'classnames'
import { SignInPart} from "./SignInPart";
import { SignUpPart } from "./SignUpPart";

interface Props {
  onClick: () => void
}

export const LoginModal: FC<Props> = ({ onClick }) => {
  const [isSignInTab, setSignInTab] = useState(true)

  return (
    <div className={style.wrapper}>
      <Foco component='div' onClickOutside={onClick} className={style.modal} >
        <div className={style.modalHead}>
          <div className={classnames(style.switch, isSignInTab && style.active)} onClick={() => setSignInTab(true)}>Sign In</div>
          <div className={classnames(style.switch, !isSignInTab && style.active)} onClick={() => setSignInTab(false)}>Sign Up</div>
          <div className={style.close} onClick={onClick} />
        </div>
        <NetworkButtons isSignInTab={isSignInTab} />
        <div className={style.divider}>
          <span className={style.line}/>
          <span> or with </span>
          <span className={style.line}/>
        </div>
        {isSignInTab ? <SignInPart /> : <SignUpPart />}
      </Foco>
    </div>
  )
}