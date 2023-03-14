import axios from 'axios'
import { words } from 'lodash'

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