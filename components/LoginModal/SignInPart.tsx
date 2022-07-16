import { FC } from "react";
import { useIntl } from "react-intl";
import styles from './SignInPart.module.scss'

export const SignInPart: FC = () => {

  const intl = useIntl()
  const signIn = intl.formatMessage({ id: "LOGIN" })
  const forgotPassword = intl.formatMessage({ id: "MODAL_FORGOT_PASSWORD_2" })
  
  return (
    <>
      <div className={styles.form}>
        <input 
          className={styles.input} 
          type="email" 
          placeholder="E-mail" 
          pattern="/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"
        />
        <input 
          className={styles.input} 
          type="password" 
          placeholder="Password"
        />
      </div>
      <div className={styles.button}> {signIn} </div>
      <div className={styles.additionalText}>
         Forgot <span className={styles.link}>{forgotPassword}</span>   {/* не разобрался */}
      </div>
    </>
  )
}