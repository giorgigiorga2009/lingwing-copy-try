import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import style from './TranslateBubble.module.scss'

interface Props {
  utteranceType: 'taskDescription' | 'answer'
  taskDescription: string
  taskText: string
  correctText: string
  currentTask: boolean
  textType?: 'replay' | 'standard'
  isHintShown: boolean
}

export const TranslateBubble: FC<Props> = ({
  taskDescription,
  taskText,
  correctText,
  utteranceType,
  currentTask,
  textType = 'standard',
  isHintShown,
}) => {
  return (
    <div
      className={classNames(
        style.container,
        style[utteranceType],
        style[textType],
        style[`${currentTask}`],
        { [style.hint]: isHintShown && currentTask },
      )}
    >
      <div className={style.header}>{taskDescription}</div>
      <div className={style.content}>
        <span className={style.correctText}>{correctText}</span>
        <span className={style.taskText}>{taskText} </span>
      </div>
    </div>
  )
}