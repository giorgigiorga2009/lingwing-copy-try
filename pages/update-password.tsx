import Swal from 'sweetalert2'
import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { resetPassword } from '@utils/auth'
import { useSession } from 'next-auth/react'
import style from './updatePassword.module.scss'
import { useTranslation } from '@utils/useTranslation'
import ContainerWrapper from '@components/passwordForget/Wrapper'
import { getIsPasswordSame, getPasswordValidation } from '@utils/validations'

const UpdatePassword: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const { data: session } = useSession()
  const token = session?.user.accessToken

  const [currentPassword, setCurrentPassword] = useState<string>('')
  const [newPassword, setNewPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const isCurrentPassValid = getPasswordValidation(currentPassword)
  const isNewPassValid = getPasswordValidation(newPassword)
  const isRepeatPassValid = getPasswordValidation(repeatPassword)
  const isPasswordSame = getIsPasswordSame(newPassword, repeatPassword)
  const areAllPasswordsValid =
    isCurrentPassValid &&
    isNewPassValid &&
    isRepeatPassValid &&
    isPasswordSame &&
    currentPassword &&
    newPassword &&
    repeatPassword

  const showAlert = (titleText: string, desc: string, isError: boolean) => {
    const title = `<span style="font-family: Noto Sans Georgian SemiBold;">${titleText}</span>`
    const text = desc
      ? `<span style="font-family: Noto Sans Georgian SemiBold;">${desc}</span>`
      : ''
    return Swal.fire({
      title,
      html: text,
      icon: isError ? 'error' : 'success',
      showConfirmButton: true,
      confirmButtonColor: 'rgb(105 46 150)',
      confirmButtonText: 'OK',
    })
  }

  const handleSubmitPassword = async () => {
    if (!areAllPasswordsValid) return

    try {
      await resetPassword({
        currentPassword,
        newPassword,
        repeatPassword,
        token,
        expirationToken: '',
      })
      showAlert(t('PASSWORD_CHANGED_SUCCESS'), '', false)
        .then(result => {
          result.isConfirmed && router.push('/profile')
          return result
        })
        .catch(error => {
          console.error('Swal error:', error)
        })
    } catch (error) {
      showAlert(t('PASSWORD_ERROR'), t('CURRENTPASSWORD_DONT_MATCH'), true)
    }
  }

  return (
    <ContainerWrapper>
      <div className={style.title}>{t('PASSWORD_CHANGE')}</div>
      <label htmlFor="currentPassword">
        {t('PASSWORD_CHANGE_CURRENT_PASSWORD')}
      </label>
      <input
        id="currentPassword"
        type="password"
        value={currentPassword}
        onChange={e => setCurrentPassword(e.target.value)}
      />
      {!isCurrentPassValid && (
        <div className={style.error}>{t('AUTH_PASSWORD_NOT_VALID')}</div>
      )}
      <label htmlFor="newPassword">{t('PASSWORD_CHANGE_NEW_PASSWORD')}</label>
      <input
        id="newPassword"
        type="password"
        value={newPassword}
        onChange={e => setNewPassword(e.target.value)}
      />
      {!isNewPassValid && (
        <div className={style.error}>{t('AUTH_PASSWORD_NOT_VALID')}</div>
      )}
      <label htmlFor="repeatPassword">
        {t('PASSWORD_CHANGE_REPEAT_NEW_PASSWORD')}
      </label>
      <input
        id="repeatPassword"
        type="password"
        value={repeatPassword}
        onChange={e => setRepeatPassword(e.target.value)}
      />
      {!isRepeatPassValid && (
        <div className={style.error}>{t('AUTH_PASSWORD_NOT_VALID')}</div>
      )}
      {!isPasswordSame && isRepeatPassValid && repeatPassword && (
        <div className={style.error}>
          {t('PASSWORD_CHANGE_PASSWORDS_DONT_MATCH')}
        </div>
      )}
      <button
        className={areAllPasswordsValid ? style.passwordsAreValid : ''}
        onClick={handleSubmitPassword}
      >
        {t('PASSWORD_CHANGE_SET')}
      </button>
    </ContainerWrapper>
  )
}

export default UpdatePassword
