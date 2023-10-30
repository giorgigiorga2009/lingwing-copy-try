import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

interface CircularProgressProps {
  percentage: number
  page: 'OnePercentPage' | 'StatisticsPage'
}

const stylesConfig: { [key: string]: any } = {
  OnePercentPage: {
    path: {
      stroke: '#ffc401',
    },
    trail: {
      stroke: '#502673',
    },
    text: {
      fontSize: '20px',
      fill: '#fff',
      fontFamily: 'SegoeUI-SemiBold',
    },
  },
  StatisticsPage: {
    path: {
      stroke: '#f6a313',
    },
    trail: {
      stroke: '#f0efee',
    },
    text: {
      fontSize: '20px',
      fill: '#676767',
      fontFamily: 'SegoeUI',
    },
  },
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  percentage,
  page,
}) => {
  const flooredPercentage = Math.floor(percentage)
  return (
    <div>
      <CircularProgressbar
        value={flooredPercentage}
        text={`${flooredPercentage}%`}
        strokeWidth={12}
        styles={{
          path: stylesConfig[page].path,
          trail: stylesConfig[page].trail,
          text: stylesConfig[page].text,
        }}
      />
    </div>
  )
}

export default CircularProgress
