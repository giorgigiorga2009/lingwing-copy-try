import React from 'react'
import Image from 'next/image'
import style from './social.module.scss'
import { signIn } from 'next-auth/react'
import tic from '@public/assets/images/tick-check/green-tick.png'
import arrow from '@/public/assets/images/arrows/arrow-right-white-v2.png'

interface SocialData {
  network: 'facebook' | 'google' | 'twitter' | 'linkedin'
  image: string
  arrowOrTic: boolean | undefined
  color: string
  width: number
  height: number
}

const Social = (data: SocialData) => {
  return (
    <button className={style.socialLink} onClick={() => signIn(data.network)}>
      <div className={style.left} style={{ backgroundColor: data.color }}>
        <Image
          src={data.image}
          width={data.width}
          height={data.height}
          alt=""
        />
      </div>
      <div className={style.right}>
        {data.arrowOrTic ? (
          <Image src={tic} width={20} height={20} alt="" />
        ) : (
          <Image src={arrow} width={12} height={20} alt="" />
        )}
      </div>
    </button>
  )
}

export default Social
