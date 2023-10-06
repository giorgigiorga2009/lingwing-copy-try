import Foco from 'react-foco'
import style from './User.module.scss'
import { useSession } from 'next-auth/react'
import UserAvatar from '../shared/UserAvatar'
import { UserDropdown } from './UserDropdown'
import { FC, useEffect, useState } from 'react'
import { getUserProfileData } from '@utils/auth'
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
  const { data: session } = useSession()
  const [openDropdown, setOpenDropdown] = useState<boolean>(false)
  const [userData, setUserData] = useState<UserProfile | null>(null)

  useEffect(() => {
    handleUserProfile()
  }, [])

  const handleUserProfile = () => {
    if (typeof window !== 'undefined' && session && !session?.user.email) {
      return getUserProfileData(session.user.accessToken).then(response =>
        setUserData(response.data),
      )
    }
  }
  return (
    <Foco
      component="div"
      className={style.container}
      onClickOutside={() => setOpenDropdown(false)}
    >
      {userData && (
        <button
          className={style.button}
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <UserAvatar image={userData.profile.avatar} />
          <p className={style.first_name}>
            {userData.profile.firstName
              ? userData.profile.firstName
              : userData.local.email}
          </p>
          <div className={style.arrow} />
          {openDropdown && <UserDropdown />}
        </button>
      )}
      {session && !userData && (
        <button
          className={style.button}
          onClick={() => setOpenDropdown(!openDropdown)}
        >
          <UserAvatar image={session.user?.picture} />
          <p className={style.first_name}>
            {session.user?.name ? session.user.name : session.user?.email}
          </p>
          <div className={style.arrow} />
          {openDropdown && <UserDropdown />}
        </button>
      )}
    </Foco>
  )
}

export default User
