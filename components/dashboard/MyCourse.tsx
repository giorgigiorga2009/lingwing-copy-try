import React, { FC } from 'react'
import MySubCourse from './MySubCourse'
import PromoSlider from './PromoSlider'
import MyMainCourse from './MyMainCourse'
import style from './MyCourse.module.scss'
import classNames from 'classnames'

interface Course {
  name: string
  uniqueStudentsCount: number
  courses: SubCourse[]
  index: number
}

interface SubCourse {
  name: string
  _id: string
  percent: string
  languageSubStandard: {
    name: string
  }
  slug: string
  status: {
    start: boolean
    continue: boolean
  }
  iLearnFromNameCode: string
}

interface Props {
  course: Course
  myLanguage: {
    nameCode: any
  }
  LANGUAGE_NAMES: {
    [key: string]: string
  }
  indexOfCourse: number
}

const MyCourse: FC<Props> = ({
  course,
  myLanguage,
  LANGUAGE_NAMES,
  indexOfCourse,
}) => {
  return (
    <>
      <div
        className={classNames(
          style.container,
          indexOfCourse === 0 ? style.container_first_one : null,
        )}
      >
        <MyMainCourse
          course={course}
          key={course.name}
          myLanguage={myLanguage}
          LANGUAGE_NAMES={LANGUAGE_NAMES}
        />
        {course.courses.map((subCourse, indexOfSubCourse) => {
          return (
            <MySubCourse
              subCourse={subCourse}
              key={subCourse._id}
              indexOfSubCourse={indexOfSubCourse}
              indexOfCourse={indexOfCourse}
            />
          )
        })}
      </div>
      {indexOfCourse === 0 && (
        <div className={style.carousel_in_courses_box}>
          <PromoSlider />
        </div>
      )}
    </>
  )
}

export default MyCourse
