import React from 'react'
import style from './statsPagePerOnePercent.module.scss'
import { useTranslation } from '@utils/useTranslation'
import CircularProgress from './circularProgress'
import wallClock from '@public/themes/images/v2/clock-with-dots.png'
import parrot from '@public/themes/images/v2/pr-parrot.png'
import Image from 'next/image'
import { StatsPagePerOnePercentProps } from '@utils/lessons/getStatsPerPercent'



const StatsPagePerOnePercent: React.FC<StatsPagePerOnePercentProps> = ({
  onClose,
  statsData
}) => {
  const { t } = useTranslation()

  function secondsToHMS(seconds: number) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const sec = seconds % 60;

    const formatted = [hours, minutes, sec].map(v => v < 10 ? '0' + v : v).join(':');
    
    return formatted;
}

 
  return (
    <div className={style.container}>
      <span className={style.prBg}></span>
      <span className={style.starOne}></span>
      <span className={style.starTwo}></span>
      <span className={style.starThree}></span>
      <span className={style.starFour}></span>
      <span className={style.starFive}></span>

      <div className={style.leftSide}>
        <div className={style.title}>{t('STATS_PER_PERCENT_PROGRESS')}</div>

        <div className={style.barCharts}>
          <div className={style.grammar}>
            <div>
              {t('STATS_PER_PERCENT_GRAMMAR')}{' '}
              <span>
                {' '}
                {statsData?.grammar.current} / {statsData?.grammar.max}
              </span>
            </div>
            <div className={style.chart}>
              <div
                className={style.filled}
                style={{ width: `${(statsData?.grammar.current || 0) / (statsData?.grammar.max || 1) * 100 }%` }}

              ></div>
            </div>
          </div>
          <div className={style.tasks}>
            <div>
              {t('STATS_PER_PERCENT_COMPLETED')} <span> {statsData?.tasks.current} / {statsData?.tasks.max}</span>
            </div>
            <div className={style.chart}>
              <div
                className={style.filled}
                style={{ width: `${(statsData?.tasks.current || 0) / (statsData?.tasks.max || 1) * 100}%` }}
                ></div>
            </div>
          </div>
        </div>
        <p>{t('STATS_PER_PERCENT_KEEP_LEARNING')}</p>
        <button onClick={onClose} className={style.continueButton}>
          <span>{t('STATS_PER_PERCENT_CONTINUE')}</span>
          <span className={style.arrow}></span>
        </button>
      </div>
      <div className={style.rightSide}>
        <div className={style.circularProgress}>
          <CircularProgress percentage={statsData?.percent || 0} />
        </div>
        <div className={style.timeContainer}>
          <Image
            src={wallClock}
            alt=""
            width={25}
            height={25}
            className={style.image}
          />
          <span className={style.time}>{t('STATS_PER_PERCENT_TIME')}</span>
          <span className={style.timeSpent}>{secondsToHMS(statsData?.timeSpent || 0)}</span>        </div>
        <Image src={parrot} alt="" className={style.parrot} />
      </div>
    </div>
  )
}

export default StatsPagePerOnePercent
