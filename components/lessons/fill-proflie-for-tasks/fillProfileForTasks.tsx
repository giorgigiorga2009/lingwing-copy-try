import React, { FormEvent, useState } from 'react'
import style from './fillProfileForTasks.module.scss'
import 'react-phone-number-input/style.css'
import { useTranslation } from '@utils/useTranslation'
import { PutData } from '@utils/profileEdit'
import Image from 'next/image'
import giftIcon from '@public/themes/images/v2/gift_icon.png'
import prepareJsonData from '@utils/profileData'
import UserProfileFields from './userProfileFields'
import ContactAndAgreementFields from './contactAndAgreementFields'
import ProfileFormButtons from './buttons'

interface Props {
  onClose: () => void
}

const FillProfileForTasks: React.FC<Props> = ({ onClose }) => {
  const { t } = useTranslation()
  const [isShowingSecondSide, setIsShowingSecondSide] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [gender, setGender] = useState<number>(0)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = localStorage.getItem('authToken')
    if (!token) {
      console.error('No token found in local storage.')
      return
    }
    const jsonData = prepareJsonData(e, phoneNumber)
    setIsShowingSecondSide(true)

    try {
      await PutData(jsonData, token)
      if (isShowingSecondSide) {
        onClose()
        //here needs to be added api call to give away bonus tasks
      } else {
        setIsShowingSecondSide(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  return (
    <div className={style.modal}>
      <form onSubmit={handleSubmit}>
        <div className={style.container}>
          <div className={style.title}>
            <Image src={giftIcon} alt="" width={30} height={30} />
            <span>{t('FILL_PROFILE_FOR_TASKS_HEADER')}</span>
          </div>
          <div className={style.form}>
            {!isShowingSecondSide ? (
              <UserProfileFields />
            ) : (
              <ContactAndAgreementFields
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                gender={gender}
                setGender={setGender}
              />
            )}
            <ProfileFormButtons
              isShowingSecondSide={isShowingSecondSide}
              onSubmit={() => handleSubmit}
              onClose={onClose}
            />
          </div>
        </div>
      </form>
    </div>
  )
}

export default FillProfileForTasks
