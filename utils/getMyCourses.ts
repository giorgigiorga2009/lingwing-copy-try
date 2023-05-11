import axios from 'axios'

export const getMyCoursesData = (locale: string) => {
  return axios
    .get(`${process.env.defaultURL}/user/getStartedCourses?lang=${locale}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        authorization:
          'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2ODEyODQwODEzNjEsImV4cCI6MTc4NjUxOTI4MTM2MSwidXNlcl9pZCI6IjY0MzY1YmYxNDRiNDVkMGYzZmU0NDkzYyJ9.bmkmoLNbxNUjzodWwNFkMqhVL8MdEj6iL8rnxxPOG_o',
      },
    })
    .then(response => response.data)
    .catch(error => console.log(error))
}
