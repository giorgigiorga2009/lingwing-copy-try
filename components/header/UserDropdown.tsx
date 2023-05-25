import { FC, Fragment, useState } from 'react'
import style from './UserDropdown.module.scss'
import Foco from 'react-foco'

interface Props {
  handleDropdown: (bool: boolean) => void
}

export const UserDropdown: FC<Props> = ({ handleDropdown }) => {
  return (
    <div className={style.dropdownContent}>
      <button className={style.log_out_btn}>Log out</button>
    </div>
  )
}
