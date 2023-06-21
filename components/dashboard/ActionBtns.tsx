import { FC } from 'react'
import Link from 'next/link'
import style from './ActionBtns.module.scss'

const ActionBtns: FC = () => {
  return (
    <>
      <div className={style.container}>
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
