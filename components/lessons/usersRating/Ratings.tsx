import Image from 'next/image'
import style from './Ratings.module.scss'
import { FC, useState, useEffect } from 'react'
import { getRatings } from '@utils/lessons/getRatings'
import { useTranslation } from '@utils/useTranslation'
import defaultImg from '/public/themes/images/v2/parrot_headphones.png'

interface User {
  avatar: string
  current: string
  firstName: string
  lastName: string
  position: number
  rating: string
}

interface Period {
  period: 'topTwenty' | 'daily' | 'weekly'
}

interface Props {
  courseId: string
  userCourseId: string
  userScore?: number
  token?: string | null
  showTopScores: boolean
}

const Ratings: FC<Props> = ({
  courseId,
  userScore,
  token,
  userCourseId,
  showTopScores,
}) => {
  const { t } = useTranslation()
  const [ratings, setRatings] = useState<User[]>([])
  const [open, setOpen] = useState(false)
  const [period, setPeriod] = useState<Period['period']>('topTwenty')
  const PERIODS: Period['period'][] = ['topTwenty', 'daily', 'weekly']
  const PERIOD_NAMES = ['RATING_TOP_20', 'RATING_DAILY', 'RATING_WEEKLY']

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const currentPeriod = period !== 'topTwenty' ? userCourseId : courseId
        const response = await getRatings({
          courseId: currentPeriod,
          period,
          token,
        })
        setRatings(response)
      } catch (error) {
        console.error('Failed to fetch Ratin˝˝gs data:', error)
      }
    }
    fetchFaqData()
  }, [period, userScore])

  return (
    <>
      <div className={style.showContainer}>
        {open === showTopScores ? (
          <button className={style.hideText} onClick={() => setOpen(!open)}>
            {t('RATING_TOP_HIDE')}
          </button>
        ) : (
          <button className={style.showText} onClick={() => setOpen(!open)}>
            {t('RATING_TOP_SCORES')}
          </button>
        )}

        <button
          className={
            open === showTopScores ? style.hideButton : style.showButton
          }
          onClick={() => setOpen(!open)}
        />
      </div>

      <div
        className={
          open === showTopScores
            ? `${style.container} ${style.show}`
            : style.container
        }
      >
        <div className={style.header}>
          <button
            className={style.buttonLeft}
            onClick={() =>
              setPeriod(PERIODS[(PERIODS.indexOf(period) - 1) % PERIODS.length])
            }
          />
          <div className={style.title}>
            {t(PERIOD_NAMES[PERIODS.indexOf(period)])}
          </div>
          <button
            className={style.buttonRight}
            onClick={() =>
              setPeriod(PERIODS[(PERIODS.indexOf(period) + 1) % PERIODS.length])
            }
          />
        </div>
        <div className={style.usersContainer}>
          {ratings &&
            ratings.map((user: User, index) => (
              <div key={index} className={style.userWrapper}>
                <Image
                  className={style.image}
                  src={user.avatar ?? defaultImg}
                  width={50}
                  height={50}
                  alt=""
                />
                <div className={style.position}>{user.position}</div>
                <div>
                  <div className={style.name}>
                    {user.firstName + ' ' + user.lastName ?? ''}
                  </div>
                  <span className={style.ratingTitle}>Rating: </span>
                  <span className={style.rating}>{user.rating}</span>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  )
}

export default Ratings
