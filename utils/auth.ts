import axios from 'axios'

interface Auth {
  email: string
  password: string
  repeatPassword: string
}

export const auth = ({ email, password, repeatPassword }: Auth) => {
  return axios({
    method: 'post',
    url: `${process.env.defaultURL}/auth/signup?lang=eng`,
    headers: { 'Content-Type': 'text/plain' },
    data: {
      profile: {
        email,
        password,
        confirmPassword: repeatPassword,
      },
    },
  })
    .then(response => console.log(response.data.data))
    .catch(error => console.log(error))
}
