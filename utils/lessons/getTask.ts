import axios, { AxiosRequestHeaders } from 'axios'

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
    dialog: {
      translation: [
        {
          words: {
            data: [
              {
                synonyms: string[]
                _word: string
              },
            ]
          }
          sentence: {
            filePath: string
            audioFileName: string
          }
        },
      ]
    }
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
    errorText: string
  }
  iLearnFrom: {
    hint?: string
    text?: string
    language: {
      name: {
        nameCode: string
      }
    }
  }[]
}

export interface TaskData {
  id: string
  ordinalNumber: number
  taskDescription: string
  taskType:
    | 'dictation'
    | 'translate'
    | 'dialog'
    | 'omittedwords'
    | 'replay'
    | 'mistakecorrection'
    | 'grammar'
  taskNumber: number
  errorLimit: number
  correctText: string | string[]
  errorText: string
  taskText: string
  mistakeTaskText: string
  dialogLinesArray: [
    {
      words: string[]
      sentenceAudioPath: string
    },
  ]
  wordsArray: {
    wordAudioPath: string
    wordLoweredText: string
    wordText: string
  }[]
  iLearnFromNameCode: string
  wordsSynonyms: [string[]]
  sentenceAudioPath: string
}

export type CourseObject = {
  _id: string
  course: {
    _id: string
    title: {
      ben: string
      tur: string
      rus: string
      esp: string
      geo: string
      eng: string
    }
    languageSubStandard: {
      name: string
    }
    iLearnFrom: {
      _id: string
      code: number
      nameCode: string
      name: {
        geo?: string
        eng?: string
        esp?: string
        tur?: string
        rus?: string
      }
    }[]
    iLearn: {
      _id: string
      nameCode: string
    }
    subTotalActiveTask: number
    configuration: {
      authUserDailyLimit: number
      enabled: boolean
      unAuthUserDailyLimit: number
    }
  }
  iLearnFromNameCode: string
  learnMode: number
  dailyReachedLimitDate: string
  sentDailyTaskCounter: number
  percent: string
  uniquePassedTasks: number
  score: number
}

export const getUserCourse = async ({
  languageTo,
  languageFrom,
  courseName,
  token,
  userId,
}: {
  languageTo: string | string[]
  languageFrom: string | string[]
  courseName: string | string[]
  token: string | null
  userId: string | null
}): Promise<CourseObject | undefined> => {
  try {
    if (token && !userId) {
      const response = await axios({
        url: `${process.env.DEFAULT_URL}/public/getUserCourse/${courseName}?lang=${languageTo}&iLearnFrom=${languageFrom}`,
        headers: {
          Authorization: token,
        },
      })
      return response.data.data
    }
    if (userId) {
      const response = await axios({
        url: `${process.env.DEFAULT_URL}/public/getUserCourse/${courseName}?lang=${languageTo}&iLearnFrom=${languageFrom}&userKey=${userId}`,
      })
      return response.data.data
    }
  } catch (error) {
    console.log(error)
  }
}

export const getTasks = async ({
  languageTo,
  languageFrom,
  token,
  courseId,
  userId,
}: {
  courseName: string | string[]
  languageTo: string | string[]
  languageFrom: string | string[]
  token: string | null
  userId: string | null
  courseId: string
}): Promise<TaskData[]> => {
  try {
    //
    let url = `${process.env.DEFAULT_URL}/public/getTasks/${courseId}/${languageFrom}?lang=${languageTo}`
    let headers: {
      Authorization: string | null
    } = {
      Authorization: token,
    }
    if (userId !== null && token !== null) {
      url += `&userKey=${userId}`
      headers = {
        Authorization: null,
      }
    }
    const response = await axios({
      url,
      headers: headers as AxiosRequestHeaders,
    })

    const data = response.data.data
    const tasks = data.tasks.map((task: InitialTask) => {
      const dialogLinesArray =
        task?.wordsAudio?.dialog &&
        task.wordsAudio.dialog.translation.map(dialogLine => {
          return {
            words: dialogLine.words.data.map(word => {
              return {
                wordLoweredText: word._word,
                wordSynonyms: word.synonyms,
              }
            }),
            sentenceAudioPath: `${dialogLine.sentence.filePath}/${dialogLine.sentence.audioFileName}`,
          }
        })
      return {
        id: task._id,
        ordinalNumber: task.ordinalNumber,
        taskDescription: task.taskType.name,
        taskType: task.taskType.nameCode,
        taskNumber: task.ordinalNumber,
        errorLimit: task.errorLimit,
        correctText: task.iLearn.text,
        errorText: task.iLearn.errorText,
        taskText: task.iLearnFrom[0].text,
        mistakeTaskText: task.iLearnFrom[0].hint,
        dialogLinesArray: dialogLinesArray,
        wordsArray:
          task?.wordsAudio?.words &&
          task.wordsAudio.words.data.map(word => {
            return {
              wordAudioPath: `${word.filePath}/${word.audioFileName}`,
              wordLoweredText: word._word,
              wordText: word.word,
            }
          }),
        wordsSynonyms: task?.wordsAudio?.words
          ? task.wordsAudio.words.data.map(word => word.synonyms)
          : [],
        iLearnFromNameCode: task.iLearnFrom[0].language.name.nameCode,
        sentenceAudioPath:
          task?.wordsAudio?.sentence &&
          `${task.wordsAudio.sentence.filePath}/${task.wordsAudio.sentence.audioFileName}`,
      }
    })
    return tasks
  } catch (error) {
    console.log(error)
    return []
  }
}
