import React, { FormEvent, useEffect, useState } from 'react'
import style from './fillProfileForTasks.module.scss'
import 'react-phone-number-input/style.css'
import { useTranslation } from '@utils/useTranslation'
import { ProfileData, PutData } from '@utils/profileEdit'
import Image from 'next/image'
import giftIcon from '@public/themes/images/v2/gift_icon.png'
import prepareJsonData from '@utils/profileData'
import UserProfileFields from './userProfileFields'
import ContactAndAgreementFields from './contactAndAgreementFields'
import ProfileFormButtons from './buttons'
import { getUserProfileData } from '@utils/auth'
import { TaskData } from '@utils/lessons/getTask'

interface Props {
  // onClose: () => void
  completedTasks?: TaskData[]
  isUserLoggedIn: boolean
}

const FillProfileForTasks: React.FC<Props> = ({
  completedTasks,
  isUserLoggedIn,
}) => {
  const { t } = useTranslation()
  const [isShowingSecondSide, setIsShowingSecondSide] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [gender, setGender] = useState<number>(0)
  const [showProfileFiller, setShowProfileFiller] = useState<boolean>(false)
  const [profileData, setPRofileData] = useState<ProfileData | undefined>(
    undefined,
  )

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
        setShowProfileFiller(false)
        //here needs to be added api call to give away bonus tasks
      } else {
        setIsShowingSecondSide(true)
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const responseData = await getUserProfileData(
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2OTY4NDU4NDA2NTYsImV4cCI6MTc3NjQyMDI0MDY1NiwidXNlcl9pZCI6IjY0Yzc5NDhkZGNlMTkzNmNjNzgxMDM3MSJ9.6qGfba1OT2vViv321FQDEpEdPhwc7kvizqexcM_sMHs',
        )
        setPRofileData(responseData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchProfileData()
    if (completedTasks?.length === 8 && !profileData?.profile?.lastName) {
      setShowProfileFiller(true)
    }
  }, [completedTasks])

  return (
    isUserLoggedIn &&
    showProfileFiller && (
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
                onClose={() => setShowProfileFiller(false)}
              />
            </div>
          </div>
        </form>
      </div>
    )
  )
}

export default FillProfileForTasks
