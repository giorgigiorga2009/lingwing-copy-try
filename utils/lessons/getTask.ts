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
    text: string
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

export const getTask = (): Promise<TaskData[]> => {
  return axios
    .get(
      `${process.env.defaultURL}/public/getTasks/63d14bc95bea880e1713b2e7/rus?lang=eng&userKey=fd2fb120-99cd-11ed-a2b7-719db0e0fb6e`,
    )
    .then(response => {
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
    })

    .catch(error => console.log(error))
}
