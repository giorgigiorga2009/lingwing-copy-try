import { FC } from 'react'
import style from './Hint.module.scss'
import { useTaskStore } from '@utils/store'


export const Hint: FC = () => {
  const HintShown = useTaskStore(state => state.HintShown);
  const HintText = useTaskStore(state => state.HintText);

  return (
    <div className={HintShown ? style.hint : style.hidden}>
      Hint: <span className={style.hintText}>{HintText}</span>
    </div>
  )
}
