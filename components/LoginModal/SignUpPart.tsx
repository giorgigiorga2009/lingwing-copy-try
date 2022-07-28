import { FC } from "react";
import { useTranslation } from "../../utis/useTranslation";
import styles from './SignUpPart.module.scss'

export const SignUpPart: FC = () => {
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
        <input
          className={styles.input}
          type="password"
          placeholder={t("AUTH_PH_PASSWORD_REPEAT")}
        />
      </div>
      <div className={styles.button}>{t("REGISTER")}</div>
      <div className={styles.agreement}>
        {t("APP_PRIVACY_POLICY1")}
        <span className={styles.link}>{t("APP_PRIVACY_POLICY2")}</span>
        <span>{t("APP_PRIVACY_POLICY_AND")}</span>
        <span className={styles.link}>{t("APP_PRIVACY_POLICY")}</span>
      </div>
    </>
  )
}