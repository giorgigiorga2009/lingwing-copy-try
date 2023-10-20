import React from 'react'
import LessonsFlowPopUps from '../lessonsFlowPopUps/lessonsFlowPopUps'
import FillProfileForTasks from '../fill-proflie-for-tasks/fillProfileForTasks'
import StatsPagePerOnePercent from '../statsPerOnePercent/statsPagePerOnePercent'
import RateLingwingModal from '../rateLingwing/rateLingwing'
import { CourseObject, TaskData } from '@utils/lessons/getTask'
import { PackageData } from '@utils/getPackages'

type CombinedPopupProps = {
  courseName?: string | string[]
  courseId: string
  isUserLoggedIn: boolean
  completedTasks?: TaskData[]
  unAuthuserDailyLimit: number
  languageTo?: string | string[]
  languageFrom?: string | string[]
  dailyTaskLeft: number
  currentCourseObject?: CourseObject
  dailyReachedLimitDate?: string | Date
  packagesData?: PackageData
}

const CombinedModalComponent: React.FC<CombinedPopupProps> = props => {
  const {
    courseName,
    courseId,
    isUserLoggedIn,
    completedTasks,
    unAuthuserDailyLimit,
    languageTo,
    languageFrom,
    dailyTaskLeft,
    currentCourseObject,
    dailyReachedLimitDate,
  } = props

  return (
    <>
      {!isUserLoggedIn && completedTasks?.length === unAuthuserDailyLimit && (
        <LessonsFlowPopUps
          popUpNumber={1}
          completedTasks={completedTasks.length}
          languageTo={languageTo}
          languageFrom={languageFrom}
        />
      )}
      <FillProfileForTasks
        completedTasks={completedTasks}
        isUserLoggedIn={isUserLoggedIn}
      />
      {isUserLoggedIn && !dailyTaskLeft && !currentCourseObject?.info.bonus && (
        <LessonsFlowPopUps
          popUpNumber={2}
          dailyLimitDate={dailyReachedLimitDate}
          courseName={courseName}
        />
      )}

      <StatsPagePerOnePercent
        isUserLoggedIn={isUserLoggedIn}
        courseId={courseId}
        completedTasks={completedTasks}
      />

      <RateLingwingModal completedTasks={completedTasks} />
    </>
  )
}

export default CombinedModalComponent