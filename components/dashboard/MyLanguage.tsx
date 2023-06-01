import { FC } from 'react'
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
}

const MyLanguage: FC<Props> = ({
  item,
  index,
  active,
  changeActive,
  t,
  LANGUAGE_NAMES,
}) => {
  return (
    <button
      onClick={() => changeActive(index)}
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
  )
}

export default MyLanguage
