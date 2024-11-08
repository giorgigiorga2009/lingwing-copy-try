type CourseAdvertisement = {
  advertDescription: string
  answer: string
  canLearn: Language[]
  completedUsers: number
  fullDescription: string
  iLearn: string
  info: {
    courseFinishTime: number
    tasksQuantity: number
    uniqueWordsQuantity: number
  }
  languageStandard: string
  languageSubStandard: string
  promo: string[]
  smallDescription: string
  studyingTheCourse: number
  tasksCount: number
  title: string
  top: TopStudent[]
  _id: string
}
type TopStudent = {
  avatar: string
  countryCode: string
  email: string
  firstName: string
  lastName: string
  position: number
  rating: number
}

type ScoresProps = {
  fullDescription: string
  studyingTheCourse: number
   top: {
    firstName: string
    lastName: string
    email?: null | string
    rating: number
    countryCode: string
    avatar?: string
    position?: number
  }[]
}



type LeaderBoardProps={
    firstName: string
    lastName: string
    email?: null | string
    rating: number
    countryCode: string
    avatar?: string
    position?: number
}