import classnames from 'classnames'
import { FC } from 'react'
import { CourseObject } from '../../utils/lessons/getTask'
import style from './ProgressBar.module.scss'

interface Props {
  currentCourseObject: CourseObject
  userScore: number
}

const ProgressBar: FC<Props> = ({ currentCourseObject, userScore }) => {
  return (
    <div className={classnames(style.progressBar, style.ratingStyle)}>
      <div className={style.scoreContainer}>
        <span className={style.scoreText}>
          Score: <span className={style.scoreNumber}>{userScore}</span>{' '}
        </span>
        <span className={style.percent}>
          {parseFloat(currentCourseObject.percent).toFixed(1)}%
        </span>
      </div>
      <div className={style.progressContainer}>
        <span className={style.progress} />
      </div>
    </div>
  )
}

export default ProgressBar
