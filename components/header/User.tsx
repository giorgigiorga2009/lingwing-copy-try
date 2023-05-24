import style from './User.module.scss'
import UserAvatar from '../shared/UserAvatar'
import { FC, useEffect, useState } from 'react'
import { getUserProfileData } from '../../utils/auth'

interface UserProfile {
  profile: {
    avatar: string
    firstName: string | null
  }
  local: {
    email: string | null
  }
}

const User: FC = () => {
  const [userData, setUserData] = useState<UserProfile | null>(null)
  useEffect(() => {
    handleUserProfile()
  }, [])

  const handleUserProfile = () => {
    if (typeof window !== 'undefined') {
      const token = window.localStorage.getItem('authToken') as string
      return getUserProfileData(token).then(response =>
        setUserData(response.data),
      )
    }
  }

  console.log(userData)

  return (
    <div className={style.container}>
      {userData && (
        <>
          <UserAvatar image={userData.profile.avatar} />
          <p className={style.first_name}>
            {userData.profile.firstName
              ? userData.profile.firstName
              : userData.local.email}
          </p>
          <div className={style.arrow} />
        </>
      )}
    </div>
  )
}

export default User
