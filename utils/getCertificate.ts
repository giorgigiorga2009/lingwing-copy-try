import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()

export interface generateCertificateTextProps {
  languageName: string
  firstName: string
  lastName: string
  level: string
  rating: number
  coursePeriod: CoursePeriod
}
type MonthYear = {
  month: number
  year: number
}
type CoursePeriod = {
  start: MonthYear
  end: MonthYear
}

export const getCertificate = (userCourseId: string) => {
  return axios
    .post(`${publicRuntimeConfig.DEFAULT_URL}/certificate`, {
      userCourseId: userCourseId,
    })
    .then(response => response.data.data)
    .catch(error => console.log(error))
}
