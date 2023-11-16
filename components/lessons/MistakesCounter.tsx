import { FC } from 'react'
import style from './MistakesCounter.module.scss'
import CircularProgress from './statsPerOnePercent/circularProgress'

interface Props {
  percentage: number
  errorLimit: number
}

export const MistakesCounter: FC<Props> = ({ percentage, errorLimit }) => {
  return (
    <div className={style.circle}>
      <CircularProgress
        page={'MistakesCounter'}
        percentage={percentage}
        errorLimit={errorLimit}
      />
    </div>
  )
}
