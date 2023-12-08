import { FC } from 'react'
import style from './Hint.module.scss'
import { useTaskStore, Hints } from '@utils/store'

const getHintInfo = (state: Hints) => ({
  HintShown: state.HintShown,
  HintText: state.HintText,
})

export const Hint: FC = () => {
  const { HintShown, HintText } = useTaskStore(getHintInfo)

  return (
    <div className={HintShown ? style.hint : style.hidden}>
      Hint: <span className={style.hintText}>{HintText}</span>
    </div>
  )
}
