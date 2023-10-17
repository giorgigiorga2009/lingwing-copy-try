
import axios from "axios"

export interface RateLingwingProps {
  onClose: () => void
}


export interface StatsPagePerOnePercentProps {
  
  onClose: () => void
  statsData?: StatsDataProps
}
export interface StatsDataProps {
  grammar: {
    current: number
    max: number
  }
  tasks: {
    current: number
    max: number
  }
  percent: number
  timeSpent: number
}

interface Props{
    userCourseId: string
}

export const getStatsPerPercent =async ({userCourseId}: Props) => {
    const headers = {
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2OTY4NDU4NDA2NTYsImV4cCI6MTc3NjQyMDI0MDY1NiwidXNlcl9pZCI6IjY0Yzc5NDhkZGNlMTkzNmNjNzgxMDM3MSJ9.6qGfba1OT2vViv321FQDEpEdPhwc7kvizqexcM_sMHs', 
      };

    return await axios
    .get(`${process.env.DEFAULT_URL}/user/learn/statisticPerPercent/${userCourseId}`, {headers: headers})
    .then(response => response.data.data)
    .catch(error => {
      console.log(error)
      return { status: 500, data: [] }
    })
}