import FlagIcon from './FlagIcon'
import classNames from 'classnames'
import { FC, useState } from 'react'
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
  //used only for small screen
  const [dropCourse, setDropCourse] = useState<boolean>(false)
  //

  return (
    <>
      <button
        onClick={() => changeActive(index)}
        className={classNames(
          style.button,
          active === index
            ? dropCourse
              ? style.button_active_mobile
              : style.button_active
            : null,
        )}
      >
        <div
          onClick={() => (changeActive(index), setDropCourse(!dropCourse))}
          className={style.overlay}
        ></div>
        <div className={style.course_and_icon}>
          <FlagIcon item={item} size="small" LANGUAGE_NAMES={LANGUAGE_NAMES} />
          <h3>{t(LANGUAGE_NAMES[item.nameCode])}</h3>
        </div>
        <div className={style.progress_and_dropdown}>
          <p className={style.progress}>
            0<span className={style.percent}>%</span>
          </p>
          <div className={style.dropdown}></div>
        </div>
      </button>
      {dropCourse && (
        <>
          {index === active ? (
            <div className={style.drop_course}>{myCourse}</div>
          ) : null}
        </>
      )}
    </>
  )
}

export default MyLanguage
