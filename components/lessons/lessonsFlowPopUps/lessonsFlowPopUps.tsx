import React, { useCallback, useEffect, useState } from 'react'
import style from './lessonsFlowPopUps.module.scss'
import PopUpCircle from './popUpCircle'
import { regReminderTitle } from '@utils/const'
import { PaymentsProps, getUserPayements } from '@utils/getUserPayemnts'
import { RegistrationReminderPopupProps } from '@utils/lessons/getRegReminder'
import RenderHeaderContent from './renderHeaderContent'
import RenderParagraphContent from './renderParagraphContent'
import RenderCheckboxWithCardDetails from './renderCheckboxWithCardDetails'
import RenderButtons from './renderButtons'

const LessonsFlowPopUps: React.FC<RegistrationReminderPopupProps> = ({
  popUpNumber,
  dailyLimitDate,
  duration,
  price,
  language,
  packetTitle,
  completedTasks,
  totalTasksAmount,
  languageTo,
  languageFrom,
}) => {
  const [openLogin, setOpenLogin] = useState(false)
  const [paymentsData, setPaymentsData] = useState<PaymentsProps | null>(null)

  const handleOpenLogin = useCallback(() => setOpenLogin(true), [])

  useEffect(() => {
    if (popUpNumber === 3) {
      const authToken = localStorage.getItem('authToken')
      if (typeof authToken === 'string') {
        getUserPayements(authToken)
          .then(data => setPaymentsData(data))
          .catch(error => console.error('Error fetching certificate:', error))
      }
    }
  }, [popUpNumber])

  return (
    <div className={style.container}>
      <div>
        <RenderHeaderContent popUpNumber={popUpNumber} language={language} />
        <div className={style.paragraph}>
          <RenderParagraphContent
            popUpNumber={popUpNumber}
            completedTasks={completedTasks}
            dailyLimitDate={dailyLimitDate}
            totalTasksAmount={totalTasksAmount}
            packetTitle={packetTitle}
          />
        </div>
      </div>
      <div className={style.mainPart}>
        {regReminderTitle.map((item, index) => (
          <PopUpCircle
            popUpNumber={popUpNumber}
            key={index}
            {...item}
            handleOpenLogin={handleOpenLogin}
          />
        ))}
      </div>
      <div className={style.paragraph}>
        <RenderCheckboxWithCardDetails
          popUpNumber={popUpNumber}
          paymentsData={paymentsData}
        />
      </div>
      <div className={style.buttons}>
        <RenderButtons
          popUpNumber={popUpNumber}
          languageTo={languageTo}
          languageFrom={languageFrom}
          price={price}
          duration={duration}
        />
      </div>
    </div>
  )
}

export default LessonsFlowPopUps
