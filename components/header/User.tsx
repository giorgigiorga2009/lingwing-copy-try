import style from './User.module.scss'
import UserAvatar from '../shared/UserAvatar'
import { FC, useEffect, useState } from 'react'
import { getUserProfileData } from '../../utils/auth'
import { UserDropdown } from './UserDropdown'

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
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
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

  const handleDropdown = (bool: boolean) => {
    setOpenDropdown(bool)
  }

  return (
    <div className={style.container} onClick={() => handleDropdown(true)}>
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
      {openDropdown && <UserDropdown handleDropdown={handleDropdown} />}
    </div>
  )
}

export default User
