
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
        'Authorization': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJsaW5nd2luZy1hcGkiLCJpYXQiOjE2OTYzMjMyNDkxMzUsImV4cCI6MTcyNDU3NjA0OTEzNSwidXNlcl9pZCI6IjY1MWFjNDViYWQyOWI4MGY2MTVmMmMwMiJ9.uiBF6ENvdPUa5L9CDxlrItugJhPWmjXGYu4iMagq2V0', 
      };

    return await axios
    .get(`https://api.lingwing.com/api/v2/user/learn/statisticPerPercent/${userCourseId}`, {headers: headers})
    .then(response => response.data.data)
    .catch(error => {
      console.log(error)
      return { status: 500, data: [] }
    })
}