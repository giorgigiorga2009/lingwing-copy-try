import { FC } from "react";
import { useTranslation } from "../../utis/useTranslation";
import styles from './SignInPart.module.scss'

export const SignInPart: FC = () => {
  const { t } = useTranslation()

  return (
    <>
      <div className={styles.form}>
        <input
          className={styles.input}
          type="email"
          placeholder={t("AUTH_PH_EMAIL")}
          pattern="/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"
        />
        <input
          className={styles.input}
          type="password"
          placeholder={t("AUTH_PH_PASSWORD")}
        />
      </div>
      <div className={styles.button}> {t("LOGIN")} </div>
      <a className={styles.link}>{t("LOGIN_FORGOT_PASSWORD")}</a>
    </>
  )
}