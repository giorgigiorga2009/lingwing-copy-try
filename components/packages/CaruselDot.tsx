import { FC } from 'react'
import style from '@components/packages/CaruselDot.module.scss'
import classNames from 'classnames'

interface Props {
  index: number
  current: number
  scrollHandler: VoidFunction
}

export const CaruselDot: FC<Props> = ({ index, current, scrollHandler }) => {
  return (
    <button
      className={classNames(style.dot, index === current && style.dot__hover)}
      onClick={scrollHandler}
    ></button>
  )
}
