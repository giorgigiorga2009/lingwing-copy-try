import React from 'react'
import style from './User.module.scss'

interface Props {}

const User = (props: Props) => {
  return (
    <div className={style.header_user_box}>
      <p className={style.first_name}>Lado</p>
    </div>
  )
}

export default User
