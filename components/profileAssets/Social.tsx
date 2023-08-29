import React from 'react'
import style from './social.module.scss'
import Image from 'next/image'

interface SocialData {
  image: string
  arrow: string
  color: string
  width: number
  height: number
}

const Social = (data: SocialData) => {
  return (
    <div className={style.socialLink}>
      <div className={style.left} style={{ backgroundColor: data.color }}>
        <Image
          src={data.image}
          width={data.width}
          height={data.height}
          alt=""
        />
      </div>
      <div className={style.right}>
        <Image src={data.arrow} width={12} height={20} alt="" />
      </div>
    </div>
  )
}

export default Social
