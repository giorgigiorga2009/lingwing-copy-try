import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();

export const getMyCoursesData = (token: string): Promise<any> => {
  return axios
    .get(`${publicRuntimeConfig.DEFAULT_URL}/user/getStartedCourses?lang=eng`, {
      headers: {
        'Content-Type': 'application/json',
        authorization: token,
      },
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}
