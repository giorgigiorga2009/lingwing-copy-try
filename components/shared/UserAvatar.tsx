import React from 'react'
import classNames from 'classnames'
import style from './UserAvatar.module.scss'

interface Props {
  image?: string
}
const UserAvatar: React.FC<Props> = ({ image }) => {
  return (
    <div
      className={classNames(
        style.avatar,
        image && image.length > 0 ? style.user_avatar : null,
      )}
    >
      {image && image.length > 0 && <img src={image} alt="User avatar" />}
    </div>
  )
}

export default UserAvatar
