import axios from 'axios'

export const getMyCoursesData = (locale: string): Promise<any> => {
  var token: any =
    'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2ODQwODIwOTgwOTQsImV4cCI6MTgwNjQyNDQ5ODA5NCwidXNlcl9pZCI6IjY0MzY1YmYxNDRiNDVkMGYzZmU0NDkzYyJ9.s_c8c_5q3v5Uw7JWnOgwy1DylbyiI5uOzyrVnEEoHu8'
  if (typeof window !== 'undefined') {
    console.log(window.localStorage.getItem('authToken'), 'token')
  }
  return axios
    .get(`${process.env.defaultURL}/user/getStartedCourses?lang=${locale}`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}
