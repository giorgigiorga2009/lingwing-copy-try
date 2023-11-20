import { FC } from 'react'
import style from './LessonsSideMenu.module.scss'
import Ratings from '@components/lessons/usersRating/Ratings'

interface Props {
  courseId: string
  token?: string | null
}

export const LessonsSideMenu: FC<Props> = ({ courseId, token }) => {
  return <Ratings courseId={courseId} token={token} />
}
