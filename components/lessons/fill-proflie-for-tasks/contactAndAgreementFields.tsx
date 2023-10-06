import React from 'react'
import PhoneInput from 'react-phone-number-input'
import { useTranslation } from '@utils/useTranslation'
import Link from 'next/link'
import style from './fillProfileForTasks.module.scss' // Import the required style module

interface Props {
  phoneNumber: string
  setPhoneNumber: (value: string) => void
  gender: number
  setGender: (value: number) => void
}

const ContactAndAgreementFields: React.FC<Props> = ({
  phoneNumber,
  setPhoneNumber,
  gender,
  setGender,
}) => {
  const { t } = useTranslation()

  const handlePhoneChange = (value?: string) => {
    setPhoneNumber(value || '')
  }

  return (
    <>
      <div className={style.phoneNumber}>
        <label htmlFor="PhoneNumber">{t('APP_PROFILE_MOBILE')}</label>
        <PhoneInput
          name="phone"
          className={style.phone}
          onChange={handlePhoneChange}
          defaultCountry="GE"
          placeHolder="555 12 34 56"
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
            className={gender === 1 ? style.maleLabelActive : style.maleLabel}
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
  )
}

export default ContactAndAgreementFields
