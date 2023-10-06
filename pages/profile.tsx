import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import style from './profile.module.scss'
import { useSession } from 'next-auth/react'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { useTranslation } from '@utils/useTranslation'
import { FollowButtons } from '@components/home/FollowButtons'
import ProfileForm from '@components/profileAssets/profileForm'

const Profile: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { data: session, status } = useSession()
  useEffect(() => {
    if (status === 'authenticated') {
      const token = session?.user.accessToken
      if (!token) {
        router.push('/')
      }
    } else if (status === 'unauthenticated') {
      router.push('/')
    }
  }, [])

  if (status === 'loading') {
    return <div>Loading...</div> // Render a loading state or any placeholder
  }

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
