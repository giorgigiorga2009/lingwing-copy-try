import axios from 'axios'

export type InitialTasksData = {
  tasks: InitialTask[]
  replay: boolean
}

interface InitialTask {
  _id: string
  course: string
  ordinalNumber: number
  point: 1
  smallDescription: string
  fullDescription: string
  segment: ''
  showGenderHint: false
  errorLimit: 3
  taskType: {
    name: string
    nameCode: string
  }
  wordsAudio: {
    synonyms: string[]
    words: {
      current: number
      data: {
        filePath: string
        audioFileName: string
        duration: number
        existAudio: boolean
        synonyms: string[]
        _word: string
        letters: {
          all: {
            number: number
            auto: boolean
            error: number
            char: string
            done: false
          }[]
          current: {
            index: number
            char: string
          }
        }
        recognized: boolean
        error: boolean
        done: boolean
        dubberId: number
        word: string
        length: number
        index: number
      }[]
    }
    sentence: {
      filePath: string
      duration: number
      existAudio: boolean
      audioFileStatus: {
        fileName: string
        extension: string
        exist: boolean
      }[]
      audioFileName: string
      text: string
    }
  }
  iLearn: {
    text: string | string[]
  }
  iLearnFrom: {
    text: string
  }[]
}

export interface TaskData {
  id: string
  taskDescription: string
  taskType: 'dictation' | 'translate'
  taskNumber: number
  errorLimit: number
  correctText: string
  taskText: string
  wordsAudio: {
    filePath: string
    fileName: string
    wordLoweredText: string
    wordText: string
  }[]
  wordsSynonyms: [string[]]
  sentenceAudio: {
    filePath: string
    fileName: string
  }
}

// export const getUserCourse = ({languageTo, languageFrom, courseName}:{languageTo:string | string[], languageFrom:string | string[], courseName:string | string[]}): Promise<string> => {
//   return axios({
//     url: `${process.env.defaultURL}/public/getUserCourse/${courseName}?lang=${languageTo}&iLearnFrom=${languageFrom}`,
//     headers: {
//       Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2NzYwMjcxMjExMjcsImV4cCI6MTc2NDE1NTEyMTEyNywidXNlcl9pZCI6IjYyOGI1YzM2MTE5NTdlMGU2YTgyZTRkMiJ9.fEDYTTVdN9E45ol6vRh1oBayC_yHljBGnYQoBFXTReQ',
//     }
//   })
//     .then(response => response.data.data._id)
// }

export const getUserCourse = async ({
  languageTo,
  languageFrom,
  courseName,
  token,
}: {
  languageTo: string | string[]
  languageFrom: string | string[]
  courseName: string | string[]
  token: string
}): Promise<string> => {
  try {
    const response = await axios({
      url: `${process.env.defaultURL}/public/getUserCourse/${courseName}?lang=${languageTo}&iLearnFrom=${languageFrom}`,
      headers: {
        Authorization: token,
      },
    })
    return response.data.data._id
  } catch (error) {
    console.log(error)
    return ''
  }
}

// export const getTasks = ({languageTo, languageFrom, courseId}:{courseId: string, languageTo:string | string[], languageFrom:string | string[]}): Promise<TaskData[]> => {
//   return axios({
//     url: `${process.env.defaultURL}/public/getTasks/${courseId}/${languageFrom}?lang=${languageTo}`,
//     // headers: {
//     //   Authorization: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2NzYwMjcxMjExMjcsImV4cCI6MTc2NDE1NTEyMTEyNywidXNlcl9pZCI6IjYyOGI1YzM2MTE5NTdlMGU2YTgyZTRkMiJ9.fEDYTTVdN9E45ol6vRh1oBayC_yHljBGnYQoBFXTReQ',
//     // }
//   })
//     .then(response => {
//       const data = response.data.data
//       const tasks = data.tasks.map((task: InitialTask) => {
//         return {
//           id: task._id,
//           taskDescription: task.taskType.name,
//           taskType: task.taskType.nameCode,
//           taskNumber: task.ordinalNumber,
//           errorLimit: task.errorLimit,
//           correctText: task.iLearn.text,
//           taskText: task.iLearnFrom[0].text,
//           wordsAudio: task.wordsAudio.words.data.map(word => {
//             return {
//               filePath: word.filePath,
//               fileName: word.audioFileName,
//               wordLoweredText: word._word,
//               wordText: word.word,
//             }
//           }),
//           wordsSynonyms: task.wordsAudio.words.data.map(word => word.synonyms),
//           sentenceAudio: {
//             filePath: task.wordsAudio.sentence.filePath,
//             fileName: task.wordsAudio.sentence.audioFileName,
//           },
//         }
//       })
//       return tasks
//     })

//     .catch(error => console.log(error))
// }

export const getTasks = async ({
  languageTo,
  languageFrom,
  token,
  courseId,
}: {
  courseName: string | string[]
  languageTo: string | string[]
  languageFrom: string | string[]
  token: string
  courseId: string
}): Promise<TaskData[]> => {
  try {
    const response = await axios({
      url: `${process.env.defaultURL}/public/getTasks/${courseId}/${languageFrom}?lang=${languageTo}`,
      headers: {
        Authorization: token,
      },
    })
    const data = response.data.data
    const tasks = data.tasks.map((task: InitialTask) => {
      return {
        id: task._id,
        taskDescription: task.taskType.name,
        taskType: task.taskType.nameCode,
        taskNumber: task.ordinalNumber,
        errorLimit: task.errorLimit,
        correctText: task.iLearn.text,
        taskText: task.iLearnFrom[0].text,
        wordsAudio: task.wordsAudio.words.data.map(word => {
          return {
            filePath: word.filePath,
            fileName: word.audioFileName,
            wordLoweredText: word._word,
            wordText: word.word,
          }
        }),
        wordsSynonyms: task.wordsAudio.words.data.map(word => word.synonyms),
        sentenceAudio: {
          filePath: task.wordsAudio.sentence.filePath,
          fileName: task.wordsAudio.sentence.audioFileName,
        },
      }
    })
    return tasks
  } catch (error) {
    console.log(error)
    return []
  }
}
