
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

interface CircularProgressProps{
    percentage: number
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const flooredPercentage = Math.floor(percentage);
  return (
    <div>
      <CircularProgressbar
        value={flooredPercentage}
        text={`${flooredPercentage}%`}
        strokeWidth={9}  
        styles={{
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
        }}
      />
    </div>
  );
}

export default CircularProgress;
