import { FC, useState } from "react";
import style from './LoginModal.module.scss'
import Foco from "react-foco";
import { NetworkButtons } from "./NetworkButtons";
import classnames from 'classnames'
import { SignInPart} from "./SignInPart";
import { SignUpPart } from "./SignUpPart";
import { useIntl } from "react-intl";

interface Props {
  onClick: () => void
}

export const LoginModal: FC<Props> = ({ onClick }) => {
  const [isSignInTab, setSignInTab] = useState(true)

  const intl = useIntl()
  const signIn = intl.formatMessage({ id: "AUTH_LOGIN" })
  const signUp = intl.formatMessage({id: "REGISTER"})
  const orWith = intl.formatMessage({id: "AUTH_SOC_MEDIA"})

  return (
    <div className={style.wrapper}>
      <Foco component='div' onClickOutside={onClick} className={style.modal} >
        <div className={style.modalHeader}>
          <div 
            className={classnames(style.headerButton, isSignInTab && style.active)} 
            onClick={() => setSignInTab(true)}>
              {signIn}
          </div>
          <div 
            className={classnames(style.headerButton, !isSignInTab && style.active)} 
            onClick={() => setSignInTab(false)}>
              {signUp}
          </div>
          <div className={style.close} onClick={onClick} />
        </div>
        <NetworkButtons isSignInTab={isSignInTab} />
        <div className={style.divider}>
          <span className={style.line}/>
          <span> {orWith} </span>
          <span className={style.line}/>
        </div>
        {isSignInTab ? <SignInPart /> : <SignUpPart />}
      </Foco>
    </div>
  )
}