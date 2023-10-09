import React, { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import style from './lessonsFlowPopUps.module.scss'
import PopUpCircle from './popUpCircle'
import Image from 'next/image'
import greenTick from '@public/themes/images/v2/bon-check.png'
import { LoginModal } from '@components/loginWindow/LoginModal'
import { regReminderTitle } from '@utils/const'
import { useTranslation } from '@utils/useTranslation'
import { PaymentsProps, getUserPayements } from '@utils/getUserPayemnts'
import { RegistrationReminderPopupProps } from '@utils/lessons/getRegReminder'
import { ReccuringPrice } from '@components/packages/Prices'
import CountDown from '@components/payment/CountDown'

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
  const { t } = useTranslation()
  const [openLogin, setOpenLogin] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [paymentsData, setPaymentsData] = useState<PaymentsProps | null>(null)

  const handleOpenLogin = useCallback(() => setOpenLogin(true), [])
  const handleCloseLogin = useCallback(() => setOpenLogin(false), [])

  const renderHeaderContent = () => {
    if (popUpNumber === 1) {
      return <p className={style.header}>{t('REG_REMINDER_HEADER')}</p>
    } else if (popUpNumber === 2) {
      return (
        <>
          <p className={style.header}>{`${language}${t(
            'REG_REMINDER_DAILY_LIMIT',
          )}`}</p>
        </>
      )
    } else if (popUpNumber === 3) {
      return (
        <div className={style.headerContainer}>
          <Image src={greenTick} alt="" />
          <p className={style.header}>{t('REG_REMINDER_TRANSACTION')}</p>
        </div>
      )
    }
    return null
  }
  const renderParagraphContent = () => {
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

  const renderCheckboxWithCardDetails = () => {
    if (popUpNumber === 2) {
      return (
        <>
          <p>{t('REG_REMINDER_LEARN_A_LANGUAGE')}</p>
          <p className={style.blackedOut}>{t('REG_REMINDER_5_TIMES')}</p>
          <p>{t('REG_REMINDER_MORE_COMFORTABLE')}</p>
        </>
      )
    } else if (popUpNumber === 3 && paymentsData?.creditCard.isAttached) {
      return (
        <div className={style.cardNumbers}>
          <label className={style.checkBoxContainer}>
            <input
              type="checkbox"
              id="agreement"
              checked={agreed}
              onChange={() => setAgreed(prev => !prev)}
            />
            <span className={style.customCheckBox}></span>
            <span>
              {`${paymentsData.creditCard.type} * ${paymentsData.creditCard.number}`}
            </span>
            <span>{t('REG_REMINDER_REMEMBER_CARD')}</span>
          </label>
        </div>
      )
    }
    return null
  }

  const renderButton = () => {
    if (popUpNumber === 1) {
      return (
        <>
          <button className={style.regButton} onClick={handleOpenLogin}>
            {t('REG_REMINDER_REGISTER_AND_CONTINUE')}
          </button>
          {openLogin && (
            <LoginModal
              openLogin={openLogin}
              setOpenLogin={setOpenLogin}
              onClick={handleCloseLogin}
            />
          )}
          <button className={style.coursesButton}>
            <Link
              href={`wizard?languageTo=${languageTo}&languageFrom=${languageFrom}`}
            >
              {t('REG_REMINDER_OTHER_COURSES')}
            </Link>
          </button>
        </>
      )
    } else if (popUpNumber === 2) {
      return (
        <>
          <button className={style.regButton}>
            <Link href="/packages">{t('REG_REMINDER_CHOOSE_PREMIUM')}</Link>
          </button>

          <div className={style.priceWrapper}>
            <p>{t('REG_REMINDER_MONTHS')}</p>
            <p className={style.monthlyPrice}>
              <ReccuringPrice
              whereTo={1} price={price || 0} duration={duration || 0} symbol="GEL" />
            </p>
          </div>
          <button className={style.orangeButton}>
            <Link href="/free-trial">{t('REG_REMINDER_5_DAY_TRIAL')}</Link>
          </button>
        </>
      )
    } else if (popUpNumber === 3) {
      return (
        <button className={style.regButton}>
          <Link href="/dashboard">{t('REG_REMINDER_DASHBOARD')}</Link>
        </button>
      )
    }
  }

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
          {renderHeaderContent()}
          <div className={style.paragraph}>{renderParagraphContent()}</div>
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
      <div className={style.paragraph}>{renderCheckboxWithCardDetails()}</div>
      <div className={style.buttons}>{renderButton()}</div>
    </div>
  )
}

export default LessonsFlowPopUps
