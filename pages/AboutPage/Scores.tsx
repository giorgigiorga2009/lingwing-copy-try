import style from './Scores.module.scss'
import Image from 'next/image'
import { useTranslation } from '@utils/useTranslation'
import ReusableBtn from './utils/Reusable/ReusableBtn'

const Scores = ({ fullDescription, studyingTheCourse, top }: any) => {
  const initialLength = 100
  const { t } = useTranslation()
console.log(top,"ss");

  return (
    <div className={style.scoreWrapper}>
      <div className={style.courseDetail}>
        <h1
          className={style.courseDetailTitle}
          dangerouslySetInnerHTML={{ __html: t('ABOUT_COURSE_INTERESTING') }}
        />
        <div className={style.customerNumber}>
          <h1 className={style.totalNumber}>
            {studyingTheCourse?.toLocaleString()}
          </h1>
          <p
            className={style.customerPracticing}
            dangerouslySetInnerHTML={{
              __html: t('ABOUT_COURSE_PEOPLE_PRACTICING'),
            }}
          />
        </div>
        <p className={style.courseDescription}>{fullDescription}</p>
        <ReusableBtn />
      </div>
      <div className={style.leaders}>
        <h1
          className={style.leadersTitle}
          dangerouslySetInnerHTML={{ __html: t('ABOUT_COURSE_TOP_SCORES') }}
        />
        <div className={style.topUsers}>
          {top?.map((user: LeaderBoardProps, index: number) => {
            const length = initialLength - index * 10
            return (
              <div
                className={style.leaderBoardContainer}
                style={{
                  width: `${length}%`,
                }}
                key={index}
              >
                <div className={style.boardRating}>
                  <p className={style.boardPosition}>{user.position}</p>
                  <Image
                    className={style.personImg}
                    src={user.avatar || ""}
                    alt="user"
                    width={80}
                    height={80}
                  />
                </div>
                <div className={style.personalInfo}>
                  <p className={style.personName}>
                    {user.firstName ? user.firstName : "Name lastName" } {user.lastName}
                  </p>
                  <p className={style.personScore}>{user.rating}</p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Scores
