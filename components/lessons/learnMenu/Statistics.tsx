import { FC } from 'react'
import style from './Statistics.module.scss'
import { useTranslation } from '@utils/useTranslation'
import CircularProgress from '../statsPerOnePercent/circularProgress'

const Statistics: FC = () => {
  const { t } = useTranslation()

  const CourseProgress = () => (
    <div className={style.progressWrapper}>
      <div className={style.statisticsTitle}>Course Progress</div>
      <div>
        Score: <span className={style.tasksDone}>300/</span>
        <span className={style.tasksLeft}>3400</span>
      </div>
    </div>
  )

  const RatingSection = () => (
    <div className={style.ratingContainer}>
      <div className={style.ratingWrapper}>
        <div className={style.ratingTitle}>Rating</div>
        <div className={style.ratingSpan}>
          <span>Position in Rating </span>
          <span>Rating </span>
        </div>
        <div className={style.ratingsWrapper}>
          <div>3456</div>
          <div>324</div>
        </div>
      </div>
    </div>
  )

  const BonusSection = () => (
    <div className={style.bonusContainer}>
      <div className={style.bonusTitle}>Bonus:</div>
      <div className={style.bonus}>
        123<span>Tasks</span>
      </div>
    </div>
  )

  const TimeSection = () => (
    <div className={style.timeContainer}>
      <div className={style.progressWrapper}>
        <div className={style.timeHeader}>
          <div className={style.timeTitle}>Time</div>
          <div>
            Started: <span className={style.date}>14/08/2020</span>{' '}
          </div>
        </div>
        <div className={style.progressContainer}>
          <span className={style.progress} style={{ width: '10%' }} />
          <div className={style.times}>
            <span>00:11:11</span>
            <span>20:23:11</span>
          </div>
        </div>
        <div className={style.descWrapper}>
          <div className={style.timeWrapper}>
            <div className={style.timeSpent}></div>
            <div className={style.desc}>Time Spent</div>
          </div>
          <div className={style.timeWrapper}>
            <div className={style.timeToComplete}></div>
            <div className={style.desc}>Time to complete course</div>
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <div className={style.container}>
      <div className={style.title}>{t('STATISTICS_COURSE')}</div>
      <div className={style.statisticsContainer}>
        <CourseProgress />
        <div className={style.circle}>
          <CircularProgress percentage={30} page={'StatisticsPage'} />
        </div>
      </div>
      <div className={style.ratingAndBonus}>
        <RatingSection />
        <BonusSection />
      </div>
      <TimeSection />
    </div>
  )
}

export default Statistics
