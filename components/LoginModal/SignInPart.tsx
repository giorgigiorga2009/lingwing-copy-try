import { FC } from "react";
import { useIntl } from "react-intl";
import styles from './SignInPart.module.scss'

export const SignInPart: FC = () => {

  const intl = useIntl()
  const signIn = intl.formatMessage({ id: "LOGIN" })
  const forgotPassword = intl.formatMessage({ id: "LOGIN_FORGOT_PASSWORD" })
  const email = intl.formatMessage({ id: "AUTH_PH_EMAIL" })
  const password = intl.formatMessage({ id: "AUTH_PH_PASSWORD" })

  return (
    <>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="email"
          placeholder={email}
          pattern="/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"
        />
        <input
          className={styles.input}
          type="password"
          placeholder={password}
        />
      </div>
      <div className={styles.button}> {signIn} </div>
      <a className={styles.link}>{forgotPassword}</a>
    </>
  )
}