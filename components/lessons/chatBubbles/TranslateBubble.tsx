import classNames from 'classnames'
import { FC, useEffect, useState } from 'react'
import style from './TranslateBubble.module.scss'

interface Props {
  utteranceType: 'taskDescription' | 'answer'
  taskDescription: string
  taskText: string
  correctText: string
  isCurrentTask: boolean
  textType?: 'replay' | 'standard'
  isHintShown: boolean
}

export const TranslateBubble: FC<Props> = ({
  taskDescription,
  taskText,
  correctText,
  utteranceType,
  isCurrentTask,
  textType = 'standard',
  isHintShown,
}) => {
  return (
    <div
      className={classNames(
        style.container,
        style[utteranceType],
        style[textType],
        style[`${isCurrentTask}`],
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
