import Image from 'next/image'
import style from './Ratings.module.scss'
import { FC, useState, useEffect } from 'react'
import { getRatings } from '@utils/lessons/getRatings'
import { useTranslation } from '@utils/useTranslation'

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
  userScore: number
  token?: string | null
}

const Ratings: FC<Props> = ({ courseId, userScore, token }) => {
  const { t } = useTranslation()
  const [ratings, setRatings] = useState<User[]>([])
  const [open, setOpen] = useState(true)
  const [period, setPeriod] = useState<Period['period']>('topTwenty')
  const PERIODS: Period['period'][] = ['topTwenty', 'daily', 'weekly']
  const PERIOD_NAMES = ['RATING_TOP_20', 'RATING_DAILY', 'RATING_WEEKLY']

  useEffect(() => {
    const fetchFaqData = async () => {
      try {
        const response = await getRatings({ courseId, period, token })
        setRatings(response)
      } catch (error) {
        console.error('Failed to fetch Ratings data:', error)
      }
    }
    fetchFaqData()
  }, [period, userScore])

  return (
    <>
      <div className={style.showContainer}>
        {!open && (
          <button className={style.showText} onClick={() => setOpen(!open)}>
            {t('RATING_TOP_SCORES')}
          </button>
        )}
        <button
          className={open ? style.hideButton : style.showButton}
          onClick={() => setOpen(!open)}
        />
      </div>
      (
      <div
        className={open ? `${style.container} ${style.show}` : style.container}
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
                  src={user.avatar ?? ''}
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
      )
    </>
  )
}

export default Ratings
