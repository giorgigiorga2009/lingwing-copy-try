import Link from 'next/link'
import Social from './Social'
import Image from 'next/image'
import React, { useState } from 'react'
import style from './rightSide.module.scss'
import ImageComponent from './imageComponent'
import { ProfileData } from '@utils/profileEdit'
import { useTranslation } from '@utils/useTranslation'
import { facebook, linkedin, google, twitter, padlock } from './imports'
import arrow from '@/public/assets/images/arrows/arrow-right-white-v2.png'

type Props = {
  data?: ProfileData
  ProfilePicture: string
  onProfilePictureChange: (value: string) => void
}

const RightSide: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation()
  const [profilePicture, setProfilePicture] = useState<string>('')

  return (
    <div className={style.rightContainer}>
      <ImageComponent
        CroppedImage={setProfilePicture}
        defaultImage={data?.profile?.avatar || profilePicture}
      />
      <h4>{t('APP_PROFILE_CONNECT_SOCIAL')}</h4>
      <div className={style.socialLinks}>
        <Social
          network="facebook"
          image={facebook.src}
          arrowOrTic={data?.socials.facebook.enabled}
          color="rgb(82, 91, 172)"
          width={12}
          height={20}
        />
        <Social
          network="google"
          image={google.src}
          arrowOrTic={data?.socials.google.enabled}
          color="rgb(227, 78, 78)"
          width={27}
          height={20}
        />
        <Social
          network="twitter"
          image={twitter.src}
          arrowOrTic={data?.socials.twitter.enabled}
          color="rgb(95, 193, 249)"
          width={24}
          height={20}
        />
        <Social
          network="linkedin"
          image={linkedin.src}
          arrowOrTic={data?.socials.linkedin.enabled}
          color="rgb(85, 98, 216)"
          width={18}
          height={20}
        />
      </div>

      <h4>{t('APP_PROFILE_GETTING_NEWS')}</h4>

      <div className={style.switches}>
        <label className={style.switch}>
          <input
            name="newsletterSubscription"
            type="checkbox"
            defaultChecked={data?.profile?.newsletterSubscription || false}
          />
          <span className={style.slider}></span>
          <label htmlFor="">{t('APP_PROFILE_SUBSCRIPTION')}</label>
        </label>

        <label className={style.switch}>
          <input
            name="smsSubscription"
            type="checkbox"
            defaultChecked={data?.profile?.smsSubscription || false}
          />
          <span className={style.slider}></span>
          <label htmlFor="">{t('APP_PROFILE_SMS_SUBSCRIPTION')}</label>
        </label>
      </div>

      <div className={style.changePassword}>
        <Image src={padlock.src} width={12} height={20} alt="" />
        <Link href="/update-password">{t('APP_PROFILE_CHANGE_PASSWORD')}</Link>
        <Image src={arrow.src} width={12} height={20} alt="" />
      </div>
      <div className={style.agree}>
        <input name="Agree" type="checkbox" required />
        <p>
          {t('APP_MARKETING_POLICY_1')}{' '}
          <Link href="privacy-policy">{t('APP_MARKETING_POLICY_2')}</Link>
          {t('APP_MARKETING_POLICY_3')}
        </p>
      </div>
      <button className={style.button} type="submit">
        {t('APP_GENERAL_SAVE_CHANGES')}
      </button>
    </div>
  )
}

export default RightSide
