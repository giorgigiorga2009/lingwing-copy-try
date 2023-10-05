import ProfileInput from '@components/profileAssets/profileInput'
import React, { useState } from 'react'
import style from '@components/lessons/fill-proflie-for-tasks/userProfileFields.module.scss'
import GenerateDate from '@components/profileAssets/generateDate'
import { useTranslation } from '@utils/useTranslation'

const UserProfileFields = () => {
  const { t } = useTranslation()
  const [firstNameFocus, setFirstNameFocus] = useState<boolean>(false)
  const [lastNameFocus, setLastNameFocus] = useState<boolean>(false)
  return (
    <>
      <ProfileInput
        name="firstName"
        type="text"
        text={t('APP_PROFILE_FIRST_NAME')}
        onFocus={() => setFirstNameFocus(true)}
        onBlur={() => setFirstNameFocus(false)}
        focused={firstNameFocus}
        required={true}
      />
      <ProfileInput
        name="lastName"
        type="text"
        text={t('APP_PROFILE_LAST_NAME')}
        onFocus={() => setLastNameFocus(true)}
        onBlur={() => setLastNameFocus(false)}
        focused={lastNameFocus}
        required={true}
      />

      <div className={style.birthDate}>
        <label htmlFor="birthdate">{t('APP_PROFILE_AGE')}</label>
        <GenerateDate BRadius="lighterBorderColor" required={true} />
      </div>
    </>
  )
}

export default UserProfileFields
