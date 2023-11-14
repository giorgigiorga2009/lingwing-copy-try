import axios from 'axios'
import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig();
interface Auth {
  email: string
  password: string
  repeatPassword?: string
}


export interface socialAuth {
  provider: string
  id: string
  name?: string | null
  email?: string | null
  image?: string | null
}

interface resetPassword {
  currentPassword: string
  newPassword: string
  repeatPassword: string
  token: string | undefined
  expirationToken: string | string[] | undefined
}

const HEADERS = {
  'Content-Type': 'application/json;charset=UTF-8',
  Accept: 'application/json, text/plain, */*',
}



export const getToken = ({ email, password, repeatPassword }: Auth) => {
  return axios({
    method: 'post',
    url: `${publicRuntimeConfig.DEFAULT_URL}/public/auth/signup?lang=eng`,
    // headers: {
    //   ...HEADERS,
    //   Authorization: 'null',
    // },
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
        url: `${publicRuntimeConfig.DEFAULT_URL}/user/profile?lang=eng`,
        headers: {
          ...HEADERS,
          Authorization: response,
        },
      }),
    )
    .then(response => response.data)
    .catch(error => console.log(error))
}

export const login = ({ email, password }: Auth) => {
  return (
    axios({
      method: 'post',
      url: `${publicRuntimeConfig.DEFAULT_URL}/public/auth/login?lang=eng`,
      // headers: {
      //   ...HEADERS,
      //   Authorization: 'null',
      // },
      data: {
        email,
        password,
      },
    })
      //.then(response => response.data.token)   Production
      .then(response => response.data.data.token)
      .catch(error => console.log(error))
  )
}

export const getUserProfileData = (token: string) => {
  return axios({
    url: `${publicRuntimeConfig.DEFAULT_URL}/user/profile`,
    headers: {
      ...HEADERS,
      Authorization: token,
    },
  })
    .then(response => response.data)
    .catch(error => console.log(error))
}

export const socialLogin = ({
  provider,
  id,
  name,
  email,
  image,
}: socialAuth) => {
  return (
    axios({
      method: 'post',
      url: `${publicRuntimeConfig.DEFAULT_URL}/public/auth/social`,
      // headers: {
      //   ...HEADERS,
      //   //Authorization: 'null',
      // },
      data: {
        provider,
        id,
        name,
        email,
        image,
      },
    })
      //.then(response => response.data.token)   Production
      .then(response => response.data.token)
      .catch(error => console.log(error))
  )
}

export const resetPassword = ({
  currentPassword,
  newPassword,
  repeatPassword,
  token,
  expirationToken,
}: resetPassword) => {
  return axios({
    method: 'post',
    url: `${publicRuntimeConfig.DEFAULT_URL}/public/auth/reset`,
    headers: {
      ...HEADERS,
      Authorization: token || '',
    },
    data: {
      currentPassword,
      password: newPassword,
      confirmPassword: repeatPassword,
      token: expirationToken,
    },
  })
    .then(response => response.data.data)
    .catch(error => {
      throw error
    })
}

export const forgotPassword = (email: string) => {
  return axios({
    method: 'post',
    url: `${publicRuntimeConfig.DEFAULT_URL}/public/auth/forgot`,
    // headers: {
    //   ...HEADERS,
    // },
    data: {
      email,
    },
  })
    .then(response => response.data.data)
    .catch(error => {
      throw error
    })
}
