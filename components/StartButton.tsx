import { FC } from "react";
import { useIntl } from "react-intl";
import { useTranslation } from "../utis/useTranslation";
import style from './StartButton.module.scss'

export const StartButton: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <div className={style.title}>
        {t("Join-the-customer-1")}
        <span className={style.usersAmount}> 261 872 </span>
        {t("Join-the-customer-2")}
      </div>

      <div className={style.button}>
        <span className={style.bubbleUp} />
        <a className={style.text}>{t("APP_NEWLAND_START_PRACTICE")}</a>
        <span className={style.bubbleDown} />
      </div>
    </div>
  )
}