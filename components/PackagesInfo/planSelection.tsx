import React from 'react'
import Image from 'next/image'
import style from './planSelection.module.scss'
import classNames from 'classnames'
import rocketParrot from '@public/assets/images/rocketParrot.png'

interface PackagesInfoProps {
  header: string
  paragraph: string
  buttonText: string
  index: number | string
}

const PlanSelection: React.FC<PackagesInfoProps> = ({
  header,
  paragraph,
  buttonText,
  index,
}) => {
  return (
    <div
      className={classNames(style.container, {
        [style.differentBG]: index === 1,
        [style.premium]: index === 2,
      })}
    >
      <div className={style.header}>
        <h3>{header}</h3>
        <p>{paragraph}</p>
      </div>
      <div>
        {index === 2 && (
          <Image
            src={rocketParrot}
            className={style.rocketParrot}
            alt=""
            width={500}
            height={500}
            priority={true}
          />
        )}
      </div>
      <div>
        <button
          className={classNames(style.button, {
            [style.premiumButton]: index === 2,
          })}
        >
          {buttonText}
        </button>
      </div>
    </div>
  )
}

export default PlanSelection
