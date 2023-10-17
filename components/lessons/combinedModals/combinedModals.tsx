import React from 'react'
import LessonsFlowPopUps from '../lessonsFlowPopUps/lessonsFlowPopUps'
import FillProfileForTasks from '../fill-proflie-for-tasks/fillProfileForTasks'
import StatsPagePerOnePercent from '../statsPerOnePercent/statsPagePerOnePercent'
import RateLingwingModal from '../rateLingwing/rateLingwing'
import { CourseObject, TaskData } from '@utils/lessons/getTask'
import { CourseData } from '@utils/getReadCourse'
import { PackageData } from '@utils/getPackages'
import { StatsDataProps } from '@utils/lessons/getStatsPerPercent'

type CombinedPopupProps = {
    isUserLoggedIn: boolean;
    completedTasks?: TaskData[]; 
    unAuthuserDailyLimit: number;
    courseData: CourseData; 
    languageTo?: string | string[];
    languageFrom?: string | string[];
    showProfileFiller: boolean;
    setShowProfileFiller: (value: boolean) => void;
    dailyTaskLeft: number;
    currentCourseObject?: CourseObject; 
    dailyReachedLimitDate?: string | Date; 
    packagesData?: PackageData; 
    language: string;
    isStatsVisible: boolean;
    setIsStatsVisible: (value: boolean) => void;
    statsData?: StatsDataProps; 
    isRateLingwingVisible: boolean;
    setIsRateLingwingVisible: (value: boolean) => void;
};


const CombinedModalComponent: React.FC<CombinedPopupProps>  = props => {
  const {
    isUserLoggedIn,
    completedTasks,
    unAuthuserDailyLimit,
    courseData,
    languageTo,
    languageFrom,
    showProfileFiller,
    setShowProfileFiller,
    dailyTaskLeft,
    currentCourseObject,
    dailyReachedLimitDate,
    packagesData,
    language,
    isStatsVisible,
    setIsStatsVisible,
    statsData,
    isRateLingwingVisible,
    setIsRateLingwingVisible,
  } = props

  return (
    <>
      {!isUserLoggedIn && completedTasks?.length === unAuthuserDailyLimit && (
        <LessonsFlowPopUps
          popUpNumber={1}
          completedTasks={completedTasks.length}
          totalTasksAmount={courseData.info.tasksQuantity}
          languageTo={languageTo}
          languageFrom={languageFrom}
        />
      )}
      {isUserLoggedIn && showProfileFiller && (
        <FillProfileForTasks onClose={() => setShowProfileFiller(false)} />
      )}
      {isUserLoggedIn && !dailyTaskLeft && !currentCourseObject?.info.bonus && (
        <LessonsFlowPopUps
          popUpNumber={2}
          dailyLimitDate={dailyReachedLimitDate}
          duration={packagesData?.packages[1].duration}
          price={packagesData?.packages[1].currency[0].recurringPrice}
          language={language}
        />
      )}

      {isUserLoggedIn && isStatsVisible && (
        <StatsPagePerOnePercent
          onClose={() => setIsStatsVisible(false)}
          statsData={statsData}
        />
      )}

      {completedTasks?.length === 20 && isRateLingwingVisible && (
        <RateLingwingModal onClose={() => setIsRateLingwingVisible(false)} />
      )}
    </>
  )
}

export default CombinedModalComponent
