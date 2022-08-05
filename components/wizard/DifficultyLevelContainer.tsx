import { FC } from 'react'
import style from './DifficultyLevelContainer.module.scss'

export const DifficultyLevelContainer: FC = () => {
  return (
    <div className={style.container}>
      <div className={style.levelLetter}>A1</div>

      <div className={style.levelName}>Beginner</div>

      <div className={style.amountOfStudents}>
        <span className={style.number}>11,057</span>
        <span className={style.text}> Students</span>
      </div>

      <div className={style.outerCircle}>
        <div className={style.innerCircle} />
      </div>

      <span className={style.iconPlane} />

      <div className={style.iconArrowContainer}>
        <span className={style.iconArrow} />
      </div>
    </div>
  )
}
