import React from 'react'
import style from './LeaderBoard.module.scss'
import { LeaderBoardProps } from '@utils/getReadCourse'

const LeaderBoard: React.FC<LeaderBoardProps> = ({ data, length }) => {
  const { position, firstName, lastName, rating, avatar } = data

  return (
    <div className={style.container} style={{ width: `${length}%` }}>
      <div className={style.position}>{position}</div>
      <img src={avatar} alt={firstName + lastName} className={style.image} />
      <div className={style.personalInfo} style={{ maxWidth: `${length}%` }}>
        <span className={style.name}>{`${firstName} ${lastName}`}</span>
        <div className={style.score}>{rating}</div>
      </div>
    </div>
  )
}

export default LeaderBoard
