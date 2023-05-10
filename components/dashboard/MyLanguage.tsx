import { FC, useState } from 'react'
import Image from 'next/image'
import style from './MyLanguage.module.scss'

interface Props {
  item: {
    _id: string
    nameCode: string
    standards: any[]
  }
  index: number
  active: number
  changeActive: (index: number) => void
  t: any
  LANGUAGE_NAMES: {
    [key: string]: string
  }
  myCourse: React.ReactNode
}

const MyLanguage: FC<Props> = ({
  item,
  index,
  active,
  changeActive,
  t,
  LANGUAGE_NAMES,
  myCourse,
}) => {
  return (
    <>
      <button
        onClick={() => changeActive(active === index ? -1 : index)}
        className={active === index ? style.my_btn_active : style.my_btn}
      >
        <div className={style.left_side}>
          <Image
            className={style.flag_icon}
            src={`/assets/images/flags/circle/big/${[
              LANGUAGE_NAMES[item.nameCode],
            ]}.png`}
            alt={`${LANGUAGE_NAMES[item.nameCode]} icon`}
            width={36}
            height={36}
          />
          <h3>{t(LANGUAGE_NAMES[item.nameCode])}</h3>
        </div>
        <p className={style.progress}>
          0<span className={style.percent}>%</span>
        </p>
      </button>
      {index === active ? (
        <div className={style.tablet_mobile}>{myCourse}</div>
      ) : null}
    </>
  )
}

export default MyLanguage
