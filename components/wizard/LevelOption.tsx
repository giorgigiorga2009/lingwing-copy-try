import classNames from 'classnames'
import { FC } from 'react'
import { Option } from '../../utils/getDifficultyLevels'
import { getNumberWithComa } from '../../utils/getNumberWithComa'
import style from './LevelOption.module.scss'

interface Props {
  option: Option
  index: number
}

export const LevelOption: FC<Props> = ({ option, index }) => {
  return (
    <div className={style.optionContainer}>
      <div className={style.logoContainer}>
        <div
          className={classNames(style.courseLogo, style[`course-${index}`])}
        />
        <span className={style.courseName}>Course{index}</span>
      </div>
      <div className={style.titleContainer}>
        <span className={style.title}>{option.title}</span>
        <span className={style.amountOfStudents}>
          <span className={style.number}>
            {getNumberWithComa(option.studyingTheCourse)}
          </span>
          <span className={style.text}>Students</span>
        </span>
      </div>
      <div className={style.buttons}>
        <div className={style.aboutButton}>About</div>
        <div className={style.startButton}>Start</div>
      </div>
    </div>
  )
}
