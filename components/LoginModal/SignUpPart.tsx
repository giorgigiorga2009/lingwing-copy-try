import { FC } from "react";
import { useIntl } from "react-intl";
import styles from './SignUpPart.module.scss'

export const SignUpPart: FC = () => {
  const intl = useIntl()
  const email = intl.formatMessage({ id: "AUTH_PH_EMAIL" })
  const password = intl.formatMessage({ id: "AUTH_PH_PASSWORD" })
  const repeatPassword = intl.formatMessage({ id: "AUTH_PH_PASSWORD_REPEAT" })
  const agreeTerms = intl.formatMessage({ id: "APP_PRIVACY_POLICY1" })
  const andThe = intl.formatMessage({ id: "APP_PRIVACY_POLICY_AND" })
  const privacyPolicy = intl.formatMessage({ id: "APP_PRIVACY_POLICY" })
  const licenseAgreement = intl.formatMessage({ id: "APP_PRIVACY_POLICY2" })
  const signUp = intl.formatMessage({ id: "REGISTER" })

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
        <input 
          className={styles.input} 
          type="password"  
          placeholder={repeatPassword}
        />
      </div>
      <div className={styles.button} >{signUp}</div>
      <div className={styles.agreement}>
        {agreeTerms}
        <span className={styles.link}>{licenseAgreement}</span> {andThe}<span className={styles.link}> {privacyPolicy}</span>
      </div>
    </>
  )
}