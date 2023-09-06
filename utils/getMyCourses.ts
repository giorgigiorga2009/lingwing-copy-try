import axios from 'axios'

export const getMyCoursesData = (token: string): Promise<any> => {
  return axios
    .get(`${process.env.DEFAULT_URL}/user/getStartedCourses?lang=eng`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}
