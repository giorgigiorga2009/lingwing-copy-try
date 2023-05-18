import React, { FC } from 'react'
import MySubCourse from './MySubCourse'
import PromoSlider from './PromoSlider'
import MyMainCourse from './MyMainCourse'
import style from './MyCourse.module.scss'

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
  counter: number
}

const MyCourse: FC<Props> = ({
  course,
  myLanguage,
  LANGUAGE_NAMES,
  counter,
}) => {
  return (
    <>
      <div className={style.container}>
        <MyMainCourse
          course={course}
          key={course.name}
          myLanguage={myLanguage}
          LANGUAGE_NAMES={LANGUAGE_NAMES}
        />
        {course.courses.map((subCourse, index) => {
          return (
            <MySubCourse
              subCourse={subCourse}
              key={subCourse._id}
              index={index}
              counter={counter}
            />
          )
        })}
      </div>
      {counter === 0 && (
        <div className={style.carousel_in_courses_box}>
          <PromoSlider />
        </div>
      )}
    </>
  )
}

export default MyCourse
