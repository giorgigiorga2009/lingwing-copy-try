import axios from 'axios'

export const getCourseInfo = async () => {
  try {
    const res = await axios.get(
      `${
        process.env.NEXT_PUBLIC_DEFAULT_URL || process.env.DEFAULT_URL
      }/public/readCourse/english_a1-1?lang=geo`,
    )
    console.log(res.data)
    return res.data
  } catch (error) {
    console.log(error, 'error')
  }
}
