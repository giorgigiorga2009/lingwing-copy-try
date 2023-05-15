import { FC, useState } from 'react'
import Image from 'next/image'
import style from './MyLanguage.module.scss'
import FlagIcon from './FlagIcon'

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
  //used only for small screen
  const [openCourse, setOpenCourse] = useState<boolean>(false)
  //

  return (
    <>
      <div className={style.desktop}>
        <button
          onClick={() => changeActive(index)}
          className={active === index ? style.my_btn_active : style.my_btn}
        >
          <div className={style.left_side}>
            <FlagIcon
              item={item}
              size="small"
              LANGUAGE_NAMES={LANGUAGE_NAMES}
            />
            <h3>{t(LANGUAGE_NAMES[item.nameCode])}</h3>
          </div>
          <p className={style.progress}>
            0<span className={style.percent}>%</span>
          </p>
        </button>
      </div>
      <div className={style.tablet_mobile}>
        <button
          onClick={() => (changeActive(index), setOpenCourse(!openCourse))}
          className={
            active === index
              ? openCourse
                ? style.my_btn_active_open
                : style.my_btn
              : style.my_btn
          }
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
          <div className={style.right_side}>
            <p className={style.progress}>
              0<span className={style.percent}>%</span>
            </p>
            <div className={style.dropdown}></div>
          </div>
        </button>

        {openCourse && <>{index === active ? <div>{myCourse}</div> : null}</>}
      </div>
    </>
  )
}

export default MyLanguage
