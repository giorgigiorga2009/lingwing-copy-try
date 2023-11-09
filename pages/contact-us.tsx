import { NextPage } from 'next'
import React, { useState } from 'react'
import style from './contact-us.module.scss'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { FollowButtons } from '@components/home/FollowButtons'
import { useTranslation } from '@utils/useTranslation'
import PostData from '@utils/contactUs'
import { PageHead } from '@components/PageHead'

const validationSchema = Yup.object({
  fullname: Yup.string().required('fullName is required').min(2).max(40),
  subject: Yup.string().required('Subject is required').min(2).max(50),
  message: Yup.string().required('Message is required').min(15).max(500),
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is required')
    .min(6)
    .max(50),
})

const ContactUs: NextPage = () => {
  const [fullnameAnim, setFullnameAnim] = useState(false)
  const [subjectAnim, setSubjectAnim] = useState(false)
  const [messageAnim, setMessageAnim] = useState(false)
  const [emailAnim, setEmailAnim] = useState(false)

  const { t } = useTranslation()

  // Formik form handling with validation and submission logic
  const formik = useFormik({
    initialValues: {
      fullname: '',
      subject: '',
      message: '',
      email: '',
    },
    validationSchema,
    onSubmit: PostData,
  })
  // Event handlers for input onBlur events
  const handleBlur =
    (inputSetter: React.Dispatch<React.SetStateAction<boolean>>) =>
    (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      removeClassName(e.target.value, inputSetter)
    }

  // Helper function to remove class names based on the input value
  const removeClassName = (
    value: string,
    stateUpdater: React.Dispatch<React.SetStateAction<boolean>>,
  ) => {
    if (value === '') {
      stateUpdater(false)
    }
  }

  return (
    <div className={style.background}>
      <PageHead
        title="META_TAG_CONTACT_US_TITLE"
        description="META_TAG_CONTACT_US_DESCRIPTION"
        keywords="META_TAG_CONTACT_US_KEYWORDS"
      />
      <Header />
      <div className={style.container}>
        <h1>{t('menuContactUs')}</h1>
        <div className={style.Form}>
          <h2>{t('APP_GET_IN_TOUCH')}</h2>
          <form onSubmit={formik.handleSubmit}>
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullname"
                className={fullnameAnim ? style.labelanimUp : ''}
              >
                {t('FULL_NAME')}
              </label>
              <input
                onFocus={() => setFullnameAnim(true)}
                onBlur={handleBlur(setFullnameAnim)}
                onChange={formik.handleChange}
                value={formik.values.fullname}
                type="text"
                id="fullname"
              />
              {formik.touched.fullname && formik.errors.fullname ? (
                <em className={style.error}>{formik.errors.fullname}</em>
              ) : null}
            </div>
            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className={subjectAnim ? style.labelanimUp : ''}
              >
                {t('SUBJECT')}
              </label>
              <input
                type="text"
                id="subject"
                onFocus={() => setSubjectAnim(true)}
                onBlur={handleBlur(setSubjectAnim)}
                onChange={formik.handleChange}
                value={formik.values.subject}
              />
              {formik.touched.subject && formik.errors.subject ? (
                <em className={style.error}>{formik.errors.subject}</em>
              ) : null}
            </div>
            {/* Message */}
            <div className={style.message}>
              <label
                htmlFor="message"
                className={messageAnim ? style.labelanimUp : ''}
              >
                {t('APP_FEEDBACK_MESSAGE')}
              </label>
              <textarea
                id="message"
                onFocus={() => setMessageAnim(true)}
                onBlur={handleBlur(setMessageAnim)}
                onChange={formik.handleChange}
                value={formik.values.message}
              />
              {formik.touched.message && formik.errors.message ? (
                <em className={style.error}>{formik.errors.message}</em>
              ) : null}
            </div>
            {/* Email */}
            <div>
              <div id={style.emailandsubmit}>
                <label
                  htmlFor="email"
                  className={emailAnim ? style.labelanimUp : ''}
                >
                  {t('MODAL_EMAIL')}
                </label>
                <input
                  type="text"
                  id="email"
                  onFocus={() => setEmailAnim(true)}
                  onBlur={handleBlur(setEmailAnim)}
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <em className={style.error}>{formik.errors.email}</em>
                ) : null}
                <button type="submit" value="Send">
                  {t('CONTACT_MESSAGE_SEND')}
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className={style.footer}>
          <FollowButtons color="grey" />
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default ContactUs
