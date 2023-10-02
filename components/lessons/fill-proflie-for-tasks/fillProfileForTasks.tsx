import React, { FormEvent, useState } from 'react'
import style from './fillProfileForTasks.module.scss'
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import { useTranslation } from '@utils/useTranslation'
import { PutData } from '@utils/profileEdit'
import Image from 'next/image'
import giftIcon from '@public/themes/images/v2/gift_icon.png'
import prepareJsonData from '@utils/profileData'
import UserProfileFields from './userProfileFields'
import Link from 'next/link'

interface Props {
  onClose: () => void
}

const FillProfileForTasks: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation()
  const [showSecondPopup, setShowSecondPopup] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [gender, setGender] = useState<number>(0)

  const handlePhoneChange = (value?: string) => {
    setPhoneNumber(value || '')
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found in local storage.')
      return
    }
    const jsonData = prepareJsonData(e, phoneNumber)
    setShowSecondPopup(true)

    try {
      await PutData(jsonData, token)
      if (showSecondPopup) {
        onClose()
      } else {
        setShowSecondPopup(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className={style.wrapper}>
        <div className={style.container}>
          <div className={style.title}>
            <Image src={giftIcon} alt="" width={30} height={30} />
            <span>{t('FILL_PROFILE_FOR_TASKS_HEADER')}</span>
          </div>
          <div className={style.form}>
            {!showSecondPopup ? (
              <UserProfileFields />
            ) : (
              <>
                <div className={style.phoneNumber}>
                  <label htmlFor="PhoneNumber">{t('APP_PROFILE_MOBILE')}</label>
                  <PhoneInput
                    name="phone"
                    className={style.phone}
                    onChange={handlePhoneChange}
                    defaultCountry="GE"
                    placeHolder='555 12 34 56'
                    required
                  />
                </div>
                <div className={style.gender}>
                  <label htmlFor="gender">{t('APP_PROFILE_GENDER')}:</label>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="male"
                      value="1"
                      checked={gender === 1}
                      onChange={() => setGender(1)}
                      required
                    />
                    <label
                      htmlFor="male"
                      className={
                        gender === 1 ? style.maleLabelActive : style.maleLabel
                      }
                      data-text={t('APP_PROFILE_MALE')}
                    >
                      {t('APP_PROFILE_MALE')}
                    </label>
                  </div>
                  <div>
                    <input
                      type="radio"
                      name="gender"
                      id="female"
                      value="2"
                      checked={gender === 2}
                      onChange={() => setGender(2)}
                    />
                    <label
                      htmlFor="female"
                      className={
                        gender === 2 ? style.femaleLabelActive : style.femaleLabel
                      }
                    >
                      {t('APP_PROFILE_FEMALE')}
                    </label>
                  </div>
                </div>
                <div className={style.agree}>
                  <input name="Agree" type="checkbox" required />
                  <p>
                    {t('APP_MARKETING_POLICY_1')}{' '}
                    <Link href="#">{t('APP_MARKETING_POLICY_2')}</Link>
                    {t('APP_MARKETING_POLICY_3')}
                  </p>
                </div>
              </>
            )}
            <div className={style.buttons}>
              {!showSecondPopup ? (
                <button
                  className={style.continueButton}
                  onClick={() => handleSubmit}
                  type="submit"
                >
                  {t('FILL_PROFILE_FOR_TASKS_CONTINUE')}
                </button>
              ) : (
                <button
                  className={style.continueButton}
                  onClick={() => handleSubmit}
                  type="submit"
                >
                  {t('FILL_PROFILE_FOR_TASKS_OBTAIN')}
                </button>
              )}
              <button className={style.skipButton} onClick={onClose}>
                {t('FILL_PROFILE_FOR_TASKS_SKIP')}
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  )
}

export default FillProfileForTasks
