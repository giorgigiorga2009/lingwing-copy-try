import React, { FC } from 'react'
import MyMainCourse from './MyMainCourse'
import style from './MyCourse.module.scss'
import MySubCourse from './MySubCourse'

interface Course {
  name: string
  uniqueStudentsCount: number
  courses: SubCourse[]
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
}

const MyCourse: FC<Props> = ({ course, myLanguage, LANGUAGE_NAMES }) => {
  return (
    <div className={style.wrapper}>
      <MyMainCourse
        course={course}
        key={course.name}
        myLanguage={myLanguage}
        LANGUAGE_NAMES={LANGUAGE_NAMES}
      />
      {course.courses.map(subCourse => {
        return <MySubCourse subCourse={subCourse} key={subCourse._id} />
      })}
    </div>
  )
}

export default MyCourse
