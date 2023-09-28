import React, { useState, FormEvent, useEffect } from 'react'
import prepareJsonData from '@utils/profileData'
import { PutData, ProfileData, GetProfileData } from '@utils/profileEdit'
import style from './profileForm.module.scss'
import Swal from 'sweetalert2'
import LeftSide from './leftSide'
import RightSide from './rightSide'

const ProfileForm = () => {
  const [data, setData] = useState<ProfileData | undefined>(undefined)
  const [phoneNumber, setPhoneNumber] = useState<string>('')
  const [profilePicture, setProfilePicture] = useState<string>('')


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('authToken')
        const responseData = await GetProfileData(token)
        setData(responseData)
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
  }, [])
  // console.log(data)

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const token = localStorage.getItem('authToken')
    if (!token) {
      console.error("No token found in local storage.");
      return;
    }
    const jsonData = prepareJsonData(e, phoneNumber, profilePicture)

    try {
      await PutData(jsonData, token)
      Swal.fire({
        title: 'Sent',
        text: 'Successfully uploaded your profile!',
        icon: 'success',
        showConfirmButton: true,
        confirmButtonColor: 'rgb(105 46 150)', // Set your desired button color here
        confirmButtonText: 'OK',
      })
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
