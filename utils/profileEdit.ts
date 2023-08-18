import axios from 'axios'

export interface ProfileData {
  local: {
    email: string
  }
  profile: {
    avatar: string
    birthday: {
      year: number | null
      month: number | null
      day: number | null
    }
    city: string
    country: string
    firstName: string
    gender: number
    phoneNumber: string
    lastName: string
    smsSubscription?: boolean
    newsletterSubscription?: boolean
  }
  socials: {
    facebook: {
      enabled: boolean
    }
    google: {
      enabled: boolean
    }
    linkedin: {
      enabled: boolean
    }
    twitter: {
      enabled: boolean
    }
  }
}

export const PutData = async (formObject: {}, token: string | null) => {
  try {
    const response = await axios.put(
      `${process.env.defaultURL}/user/profile`,
      formObject,
      {
        headers: {
          Authorization: token!,
        },
      },
    )

    // Return the response data
    return response.data
  } catch (error) {
    // Handle any errors here
    console.error('Error during PUT request:', error)
    throw error
  }
}

export const GetProfileData = async (token: string | null) => {
  try {
    const response = await axios.get(`${process.env.defaultURL}/user/profile`, {
      headers: {
        Authorization: token!,
      },
    })

    // Return the response data
    return response.data.data
  } catch (error) {
    // Handle any errors here
    console.error('Error during GET request:', error)
    throw error
  }
}

export const UploadImage = async (token: string | null, image?: string) => {
  try {
    if (image) {
      // Check if image is not undefined
      const formData = new FormData()
      formData.append('file', image)

      const response = await axios.post(
        `${process.env.defaultURL}/user/profile/avatar/upload`,
        formData,
        {
          headers: {
            Authorization: token!,
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      //take res image
      return response.data

      // Handle the response here
    } else {
      console.error('Image is undefined') // Log an error or take appropriate action
    }
  } catch (error) {
    console.error('UploadImage error:', error)
    throw error
  }
}