import { FC } from 'react'
import Link from 'next/link'
import style from './ActionBtns.module.scss'

interface Props {}

const ActionBtns: FC<Props> = ({}): JSX.Element => {
  return (
    <>
      <div className={style.action_btns}>
        <Link href={`#`}>
          <button className={style.statistics}></button>
        </Link>
        <Link href={`#`}>
          <button className={style.reset}></button>
        </Link>
        <Link href={`#`}>
          <button className={style.info}></button>
        </Link>
      </div>
    </>
  )
}

export default ActionBtns
