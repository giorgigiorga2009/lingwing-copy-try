import GenerateDate from './generateDate'
import ProfileInput from './profileInput'
import style from './leftSide.module.scss'
import 'react-phone-number-input/style.css'
import CountrySelector from './countrySelector'
import { ProfileData } from '@utils/profileEdit'
import PhoneInput from 'react-phone-number-input'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '@utils/useTranslation'

type Props = {
  data?: ProfileData
  onPhoneNumberChange: (value: string) => void
}

const LeftSide: React.FC<Props> = ({ data, onPhoneNumberChange }) => {
  const [firstNameFocus, setFirstNameFocus] = useState<boolean>(false)
  const [lastNameFocus, setLastNameFocus] = useState<boolean>(false)
  const [emailFocus, setEmailFocus] = useState<boolean>(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')

  const { t } = useTranslation()

  const handlePhoneChange = (value?: string) => {
    setPhoneNumber(value || '')
    onPhoneNumberChange(value || '') // Call the callback function
  }

  useEffect(() => {
    handlePhoneChange(data?.profile?.phoneNumber)
  }, [data])

  const birthdayDay = data?.profile?.birthday?.day || 0
  const birthdayMonth = data?.profile?.birthday?.month || 0
  const birthdayYear = data?.profile?.birthday?.year || 0

  return (
    <div className={style.leftContainer}>
      <ProfileInput
        name="firstName"
        type="text"
        text={t('APP_PROFILE_FIRST_NAME')}
        onFocus={() => setFirstNameFocus(true)}
        onBlur={() => setFirstNameFocus(false)}
        focused={firstNameFocus}
        value={data?.profile?.firstName || ''}
      />
      <ProfileInput
        name="lastName"
        type="text"
        text={t('APP_PROFILE_LAST_NAME')}
        onFocus={() => setLastNameFocus(true)}
        onBlur={() => setLastNameFocus(false)}
        focused={lastNameFocus}
        value={data?.profile?.lastName || ''}
      />
      <ProfileInput
        name="email"
        type="email"
        text={t('APP_PROFILE_EMAIL_ADDRESS')}
        onFocus={() => setEmailFocus(true)}
        onBlur={() => setEmailFocus(false)}
        focused={emailFocus}
        value={data?.local?.email || ''}
      />
      <div className={style.phoneNumber}>
        <label htmlFor="PhoneNumber">{t('APP_PROFILE_MOBILE')}</label>
        <PhoneInput
          name="phone"
          className={style.phone}
          value={data?.profile?.phoneNumber || phoneNumber}
          onChange={handlePhoneChange}
          defaultCountry="GE"
        />
      </div>
      <div className={style.birthDate}>
        <label htmlFor="birthdate">{t('APP_PROFILE_AGE')}</label>
        <GenerateDate
          defaultDay={birthdayDay}
          defaultMonth={birthdayMonth}
          defaultYear={birthdayYear}
        />
      </div>
      <div className={style.country}>
        <CountrySelector
          defaultCountry={data?.profile?.country}
          defaultCity={data?.profile?.city}
        />
      </div>
    </div>
  )
}

export default LeftSide
