import React from 'react'
import style from './UserAvatar.module.scss'

interface Props {
  image?: string
}
const UserAvatar: React.FC<Props> = ({ image }) => {
  return (
    <div className={style.avatar}>
      {
        <img
          src={
            !!image?.length ? image : '/assets/images/avatar-default-medium.png'
          }
          alt="User avatar"
        />
      }
    </div>
  )
}

export default UserAvatar
