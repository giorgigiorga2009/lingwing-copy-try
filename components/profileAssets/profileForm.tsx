import Swal from 'sweetalert2'
import LeftSide from './leftSide'
import RightSide from './rightSide'
import { useSession } from 'next-auth/react'
import style from './profileForm.module.scss'
import prepareJsonData from '@utils/profileData'
import { useTranslation } from '@utils/useTranslation'
import React, { useState, FormEvent, useEffect } from 'react'
import { PutData, ProfileData, GetProfileData } from '@utils/profileEdit'

const ProfileForm = () => {
  const { data: session } = useSession()
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [profilePicture, setProfilePicture] = useState<string>('')
  const [data, setData] = useState<ProfileData | undefined>(undefined)

  const { t } = useTranslation()

  const fetchData = async () => {
    try {
      if (session) {
        const responseData = await GetProfileData(session?.user.accessToken)
        setData(responseData)
      }
    } catch (error) {
      console.error('Error fetching data:', error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const jsonData = prepareJsonData(e, phoneNumber, profilePicture)

    try {
      if (session) {
        await PutData(jsonData, session?.user.accessToken)
        Swal.fire({
          title: 'Sent',
          text: 'Successfully uploaded your profile!',
          icon: 'success',
          showConfirmButton: true,
          confirmButtonColor: 'rgb(105 46 150)', // Set your desired button color here
          confirmButtonText: 'OK',
        })
      }
      // Handle success response
    } catch (error) {
      console.error('Error:', error)
      // Handle error
    }
  }

  return (
    <form className={style.profileContainer} onSubmit={handleSubmit}>
      <LeftSide data={data} onPhoneNumberChange={setPhoneNumber} />
      <RightSide
        data={data}
        ProfilePicture={profilePicture}
        onProfilePictureChange={setProfilePicture}
      />
    </form>
  )
}

export default ProfileForm
