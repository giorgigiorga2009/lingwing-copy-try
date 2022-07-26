import { FC } from "react";
import { useIntl } from "react-intl";
import style from './StartButton.module.scss'

export const StartButton: FC = () => {
  const intl = useIntl()
  const startLearning = intl.formatMessage({ id: "APP_NEWLAND_START_PRACTICE" })
  const join = intl.formatMessage({ id: "Join-the-customer-1" })
  const users = intl.formatMessage({ id: "Join-the-customer-2" })

  return (
    <div className={style.container}>
      <div className={style.title}>
        {join}
        <span className={style.usersAmount}> 261 872 </span>
        {users}
      </div>

      <div className={style.button}>
        <span className={style.bubbleUp} />
        <a className={style.text}>{startLearning}</a>
        <span className={style.bubbleDown} />
      </div>
    </div>
  )
}