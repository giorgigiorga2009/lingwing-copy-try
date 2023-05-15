import React, { FC } from 'react'
import MyMainCourse from './MyMainCourse'
import MySubCourse from './MySubCourse'
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
  console.log(myLanguage, 'myLanguage')

  return (
    <div className={style.wrapper}>
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
  )
}

export default MyCourse
