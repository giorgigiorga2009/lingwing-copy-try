import React, { useState } from 'react'
import Link from 'next/link'
import style from './RegistrationReminderPopup.module.scss'
import PopUpCircle from './popUpCircle'
import { LoginModal } from '@components/loginWindow/LoginModal'
import { useTranslation } from '@utils/useTranslation'
import { regReminderTitle } from '@utils/const'
import { RegistrationReminderPopupProps } from '@utils/lessons/getRegReminder'


const RegistrationReminderPopup: React.FC<RegistrationReminderPopupProps> = ({completedTasks, totalTasksAmount, languageTo, languageFrom}) => {
  const { t } = useTranslation()
  const [openLogin, setOpenLogin] = useState(false)

  return (
    <div className={style.container}>
      <div>
        <p className={style.header}>{t('REG_REMINDER_HEADER')}</p>
        <div className={style.paragraph}>
          <p>{t('REG_REMINDER_YOU_HAVE_COMPLETED')}</p>
          <p className={style.number}>{completedTasks}</p>
          <p>{t('REG_REMINDER_OUT_OF')}</p>
          <p className={style.number}>{totalTasksAmount}</p>
          <p>{t('REG_REMINDER_TASKS')}</p>
        </div>
      </div>
      <div className={style.mainPart}>
        {regReminderTitle.map((item, index) => (
          <PopUpCircle
            key={index}
            imageClass={item.imageClass}
            title={item.title}
            titleClass={item.titleClass}
          />
        ))}
      </div>
      <div className={style.buttons}>
        <button
          className={style.regButton}
          onClick={() =>  setOpenLogin(true)}
        >
          {t('REG_REMINDER_REGISTER_AND_CONTINUE')}
        </button>
        {openLogin && (
          <LoginModal
            openLogin={openLogin}
            setOpenLogin={setOpenLogin}
            onClick={() => setOpenLogin(false)}
          />
        )}
        <button className={style.coursesButton}>
          <Link href={`wizard?languageTo=${languageTo}&languageFrom=${languageFrom}`}>
          {t('REG_REMINDER_OTHER_COURSES')}
          </Link>
        </button>
      </div>
    </div>
  )
}

export default RegistrationReminderPopup
