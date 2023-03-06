import { is } from '@react-spring/shared'
import classNames from 'classnames'
import dynamic from 'next/dynamic'
import { FC, useEffect, useState } from 'react'
import style from './TranslateBubble.module.scss'

interface Props {
  utteranceType: 'taskDescription' | 'answer'
  taskDescription: string
  taskText: string
  correctText: string
  currentTask: boolean
  textType?: 'replay' | 'standard'
}

export const TranslateBubble: FC<Props> = ({
  taskDescription,
  taskText,
  correctText,
  utteranceType,
  currentTask,
  textType = 'standard',
}) => {
  return (
    <div
      className={classNames(
        style.container,
        style[utteranceType],
        style[textType],
        style[`${currentTask}`],
      )}
    >
      <div className={style.header}>{taskDescription}</div>
      <div className={style.content}>
        <span className={style.correctText}>{correctText}</span>
        <span className={style.taskText}>{taskText} </span>
      </div>
      {/* <div className={style.hint}>
        <span className={style.label}>Hint:</span>
        <span className={style.hintText}>sono</span>
        <div className={style.soundIcon} />
      </div> */}
    </div>
  )
}
