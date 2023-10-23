import Swal from 'sweetalert2'
import { NextPage } from 'next'
import { useState } from 'react'
import { useRouter } from 'next/router'
import { resetPassword } from '@utils/auth'
import style from '../forgotPassword.module.scss'
import { useTranslation } from '@utils/useTranslation'
import { getPasswordValidation, getIsPasswordSame } from '@utils/validations'
import ContainerWrapper from '@components/passwordForget/Wrapper'

const UpdatePassword: NextPage = () => {
  const router = useRouter()
  const { t } = useTranslation()
  const token = router.query.token

  const [newPassword, setNewPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const isNewPassValid = getPasswordValidation(newPassword)
  const isRepeatPassValid = getPasswordValidation(repeatPassword)
  const isPasswordSame = getIsPasswordSame(newPassword, repeatPassword)
  const areAllPasswordsValid =
    isNewPassValid &&
    isRepeatPassValid &&
    isPasswordSame &&
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
        currentPassword: '',
        newPassword,
        repeatPassword,
        token: '',
        expirationToken: token,
      })
      showAlert(t('PASSWORD_CHANGED_SUCCESS'), '', false)
        .then(result => {
          // result.isConfirmed && router.push('/profile')
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
      <div className={style.title}>{t('RESET_PASSWORD')}</div>
      <div className={style.wrapper}>
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
      </div>
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
