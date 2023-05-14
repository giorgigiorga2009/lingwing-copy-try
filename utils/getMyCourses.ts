import axios from 'axios'

export const getMyCoursesData = (locale: string): Promise<any> => {
  var token: any
  if (typeof window !== 'undefined') {
    console.log(window.localStorage.getItem('authToken'), 'token')
  }
  return axios
    .get(`${process.env.defaultURL}/user/getStartedCourses?lang=${locale}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: `${token}`,
      },
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}
