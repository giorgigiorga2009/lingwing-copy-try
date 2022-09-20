import axios from 'axios'

interface Auth {
  email: string
  password: string
  repeatPassword: string
}

const HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  Accept: 'application/json, text/plain, */*',
}

export const getToken = ({ email, password, repeatPassword }: Auth) => {
  return axios({
    method: 'post',
    url: `${process.env.defaultURL}/public/auth/signup?lang=eng`,
    headers: {
      ...HEADERS,
      Authorization: 'null',
    },
    data: {
      profile: {
        email,
        password,
        confirmPassword: repeatPassword,
      },
    },
  })
    .then(response => response.data.token)
    .catch(error => console.log(error))
}

export const auth = ({ email, password, repeatPassword }: Auth) => {
  return getToken({ email, password, repeatPassword })
    .then(response =>
      axios({
        url: `${process.env.defaultURL}/user/profile?lang=eng`,
        headers: {
          ...HEADERS,
          Authorization: response,
        },
      }),
    )
    .then(response => response.data)
    .catch(error => console.log(error))
}
