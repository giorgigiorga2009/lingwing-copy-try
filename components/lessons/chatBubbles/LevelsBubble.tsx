import { FC } from 'react'
import classNames from 'classnames'
import style from './LevelsBubble.module.scss'

interface Props {
  mistake: number
}

export const LevelsBubble: FC<Props> = ({ mistake }) => {
  let mistakeOrNot = Boolean(mistake).toString()
  return (
    <div className={style.levelsContainer}>
      <div
        className={classNames(
          style.levels,
          style[mistakeOrNot],
          //style[(!!answers[0]).toString()],
        )}
      />
      <div className={style.levels}></div>
      <div className={style.levels}></div>
    </div>
  )
}
