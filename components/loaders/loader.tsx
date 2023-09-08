import React from 'react'
import style from './loader.module.scss'

const Loader = () => {
  return (
    <div className={style.snippet} data-title="dot-pulse">
          <div className={style.stage}>
            <div className={style.dotPulse}></div>
          </div>
        </div>
  )
}

export default Loader
