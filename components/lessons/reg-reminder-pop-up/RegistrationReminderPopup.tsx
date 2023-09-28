import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import style from './RegistrationReminderPopup.module.scss';
import PopUpCircle from './popUpCircle';
import { LoginModal } from '@components/loginWindow/LoginModal';
import { useTranslation } from '@utils/useTranslation';
import { regReminderTitle } from '@utils/const';
import Image from 'next/image';
import greenTick from '@public/themes/images/v2/bon-check.png';
import { PaymentsProps, getUserPayements } from '@utils/getUserPayemnts';
import { RegistrationReminderPopupProps } from '@utils/lessons/getRegReminder';

const RegistrationReminderPopup: React.FC<RegistrationReminderPopupProps> = ({
  packetTitle,
  isRegReminder,
  completedTasks,
  totalTasksAmount,
  languageTo,
  languageFrom,
}) => {
  const { t } = useTranslation();
  const [openLogin, setOpenLogin] = useState(false);
  const [agreed, setAgreed] = useState(false);
  const [paymentsData, setPaymentsData] = useState<PaymentsProps | null>(null);

  const handleOpenLogin = useCallback(() => setOpenLogin(true), []);
  const handleCloseLogin = useCallback(() => setOpenLogin(false), []);

  useEffect(() => {
    if (!isRegReminder) {
      const authToken = localStorage.getItem('authToken');
      if (typeof authToken === 'string') {
        getUserPayements(authToken)
          .then(data => setPaymentsData(data))
          .catch(error => console.error('Error fetching certificate:', error));
      }
    }
  }, [isRegReminder]);

  return (
    <div className={style.container}>
      <div>
        {isRegReminder ? (
          <p className={style.header}>{t('REG_REMINDER_HEADER')}</p>
        ) : (
          <div className={style.headerContainer}>
            <Image src={greenTick} alt="" />
            <p className={style.header}>{t('REG_REMINDER_TRANSACTION')}</p>
          </div>
        )}
        <div className={style.paragraph}>
          {isRegReminder ? (
            <>
              <p>{t('REG_REMINDER_YOU_HAVE_COMPLETED')}</p>
              <p className={style.number}>{completedTasks}</p>
              <p>{t('REG_REMINDER_OUT_OF')}</p>
              <p className={style.number}>{totalTasksAmount}</p>
              <p>{t('REG_REMINDER_TASKS')}</p>
            </>
          ) : (
            <p className={style.activated}>
              {`${t('REG_REMINDER_PACKAGE_ACTIVATED')} "${packetTitle}"`}
            </p>
          )}
        </div>
      </div>
      <div className={style.mainPart}>
        {regReminderTitle.map((item, index) => (
          <PopUpCircle
            isRegReminder={isRegReminder}
            key={index}
            {...item}
            handleOpenLogin={handleOpenLogin}
          />
        ))}
      </div>
      {!isRegReminder && paymentsData && (
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
      )}
      <div className={style.buttons}>
        {isRegReminder ? (
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
              <Link href={`wizard?languageTo=${languageTo}&languageFrom=${languageFrom}`}>
                {t('REG_REMINDER_OTHER_COURSES')}
              </Link>
            </button>
          </>
        ) : (
          <button className={style.regButton}>
            <Link href="/dashboard">{t('REG_REMINDER_DASHBOARD')}</Link>
          </button>
        )}
      </div>
    </div>
  );
};

export default RegistrationReminderPopup;
