import { FC } from 'react'
import classNames from 'classnames'
import style from './LevelsBubble.module.scss'

interface Props {
  mistakesByLevel: number[]
}

export const LevelsBubble: FC<Props> = ({ mistakesByLevel }) => {
  return (
    <div className={style.levelsContainer}>
      {mistakesByLevel.map(mistake => (
        <div
          className={classNames(
            style.levels,
            style[mistake > -1 ? Boolean(mistake).toString() : ''],
          )}
        />
      ))}
    </div>
  )
}
