import React, { useEffect } from 'react'
import style from './profile.module.scss'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { FollowButtons } from '@components/home/FollowButtons'
import { useRouter } from 'next/router'
import ProfileForm from '@components/profileAssets/profileForm'
import { useTranslation } from '@utils/useTranslation'

const Profile: React.FC = () => {
  const router = useRouter()
  const { t } = useTranslation()
  useEffect(() => {
    const token = localStorage.getItem('authToken')
    if (!token) {
      // Redirect to the home page or any other desired page
      router.push('/')
    }
  }, [router])

  return (
    <div className={style.background}>
      <div className={style.header}>
        <Header size="s" />
      </div>
      <div className={style.container}>
        <h1 className={style.title}>{t('APP_PROFILE_EDIT')}</h1>
        <ProfileForm />
        <div className={style.footer}>
          <FollowButtons color="grey" />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default Profile
