import Link from 'next/link'
import Social from './Social'
import Image from 'next/image'
import style from './rightSide.module.scss'
import ImageComponent from './imageComponent'
import { ProfileData } from '@utils/profileEdit'
import React, { useState, useEffect } from 'react'
import { useTranslation } from '@utils/useTranslation'
import { facebook, linkedin, google, twitter, padlock } from './imports'

type Props = {
  data?: ProfileData
  ProfilePicture: string
  onProfilePictureChange: (value: string) => void
}

const RightSide: React.FC<Props> = ({ data }) => {
  const { t } = useTranslation()
  const [profilePicture, setProfilePicture] = useState<string>('')
  const [gender, setGender] = useState<number | undefined>(
    data?.profile?.gender,
  )

  useEffect(() => {
    setGender(data?.profile.gender)
  }, [data])

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
      <div className={style.newsAndGender}>
        <div className={style.switches}>
          <h4>{t('APP_PROFILE_GETTING_NEWS')}</h4>

          <label className={style.switch}>
            <input
              name="newsletterSubscription"
              type="checkbox"
              defaultChecked={data?.profile?.newsletterSubscription || true}
            />
            <span className={style.slider}></span>
            <label htmlFor="">{t('APP_PROFILE_SUBSCRIPTION')}</label>
          </label>

          <label className={style.switch}>
            <input
              name="smsSubscription"
              type="checkbox"
              defaultChecked={data?.profile?.smsSubscription || true}
            />
            <span className={style.slider}></span>
            <label htmlFor="">{t('APP_PROFILE_SMS_SUBSCRIPTION')}</label>
          </label>
        </div>

        <div className={style.genderContainer}>
          <h4>{t('APP_PROFILE_GENDER')}:</h4>
          <div className={style.gender}>
            <input
              type="radio"
              name="gender"
              id="male"
              value="1"
              checked={gender === 1}
              onChange={() => setGender(1)}
            />
            <label
              htmlFor="male"
              className={gender === 1 ? style.maleLabelActive : style.maleLabel}
              data-text={t('APP_PROFILE_MALE')}
            >
              {t('APP_PROFILE_MALE')}
            </label>
          </div>
          <div>
            <input
              type="radio"
              name="gender"
              id="female"
              value="2"
              checked={gender === 2}
              onChange={() => setGender(2)}
            />
            <label
              htmlFor="female"
              className={
                gender === 2 ? style.femaleLabelActive : style.femaleLabel
              }
            >
              {t('APP_PROFILE_FEMALE')}
            </label>
          </div>
        </div>
      </div>
      <div className={style.changePassword}>
        <Image src={padlock.src} width={12} height={20} alt="" />
        <Link href="/update-password">{t('APP_PROFILE_CHANGE_PASSWORD')}</Link>
      </div>
      <div className={style.agree}>
        <input name="Agree" type="checkbox" checked={true} />
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
