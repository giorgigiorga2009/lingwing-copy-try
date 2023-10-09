import style from './lessonsFlowPopUps.module.scss'
import CountDown from '@components/payment/CountDown'
import { useTranslation } from '@utils/useTranslation'
import { RegistrationReminderPopupProps } from '@utils/lessons/getRegReminder'

const RenderParagraphContent: React.FC<RegistrationReminderPopupProps> = ({popUpNumber, completedTasks, dailyLimitDate, totalTasksAmount, packetTitle}) => {
    const {t} = useTranslation()
    if (popUpNumber === 1) {
      return (
        <>
          <p>{t('REG_REMINDER_YOU_HAVE_COMPLETED')}</p>
          <p className={style.number}>{completedTasks}</p>
          <p>{t('REG_REMINDER_OUT_OF')}</p>
          <p className={style.number}>{totalTasksAmount}</p>
          <p>{t('REG_REMINDER_TASKS')}</p>
        </>
      )
    } else if (popUpNumber === 2) {
      return (
        <>
          <p>{t('REG_REMINDER_YOU')}</p>
          <p>{t('REG_REMINDER_FREE_TASKS_IN')}</p>
          <CountDown forLessonsFlowN2={true} dailyLimitDate={dailyLimitDate} />
          <p>{t('REG_REMINDER_HOURS')}</p>
        </>
      )
    } else if (popUpNumber === 3) {
      return (
        <p className={style.activated}>
          {`${t('REG_REMINDER_PACKAGE_ACTIVATED')} "${packetTitle}"`}
        </p>
      )
    }
    return null
  }

export default RenderParagraphContent