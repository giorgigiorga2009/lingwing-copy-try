import React from 'react'
import style from './UserAvatar.module.scss'
import Image from 'next/image'

interface Props {
  image?: string | null
}
const UserAvatar: React.FC<Props> = ({ image }) => {
  return (
    <div className={style.avatar}>
      {
        <Image
          src={
            !!image?.length ? image : '/assets/images/avatar-default-medium.png'
          }
          alt="User avatar"
          width={100}
          height={100}
        />
      }
    </div>
  )
}

export default UserAvatar
