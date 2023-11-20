import axios from 'axios'
import getConfig from 'next/config'
//const { process.env } = getConfig()

interface Props {
  courseId: string
  LanguageFrom: string | string[] | undefined
  item?: string
  token?: string
}

export const getAllGrammar = async ({
  courseId,
  LanguageFrom,
  token,
}: Props) => {
  const headers = {
    Authorization: token ?? '',
  }
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_DEFAULT_URL}/public/learn/grammar/list/${courseId}/${LanguageFrom}?lang=eng`,
      {
        headers: headers,
      },
    )
    .then(response => response.data.data.list)
    .catch(error => {
      console.log(error)
      return error
    })
}

export const getGrammarItem = async ({
  courseId,
  LanguageFrom,
  item,
  token,
}: Props) => {
  const headers = {
    Authorization: token ?? '',
  }
  return await axios
    .get(
      `${process.env.NEXT_PUBLIC_DEFAULT_URL}/public/learn/grammar/item/${courseId}/${LanguageFrom}/${item}?lang=eng`,
      {
        headers: headers,
      },
    )
    .then(response => response.data.data.text)
    .catch(error => {
      console.log(error)
      return error
    })
}
