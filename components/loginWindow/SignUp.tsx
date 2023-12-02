import { FC, useState } from 'react'
import { Input } from './Input'
import { auth } from '@utils/auth'
import { AuthButton } from './AuthButton'
import { SignUpFooter } from './SignUpFooter'
import style from './SignUp.module.scss'
import { useTranslation } from '@utils/useTranslation'
import ShowErr from '@components/shared/ShowInputError'

import {
  getEmailValidation,
  getIsPasswordSame,
  getPasswordValidation,
} from '@utils/validations'

interface Props {
  signIn: () => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
}

export const SignUp: FC<Props> = ({
  signIn,
  email,
  setEmail,
  password,
  setPassword,
}) => {
  const { t } = useTranslation()
  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
  const [repeatPassword, setRepeatPassword] = useState<string>('')
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true)
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(true)
  const [emailExistsError, setEmailExistsError] = useState<boolean>(false)

  const passwordChangeHandler = (password: string) => {
    setIsPasswordValid(getPasswordValidation(password))
    setPassword(password)
  }

  const repeatPasswordChangeHandler = (repeatPassword: string) => {
    setIsPasswordSame(getIsPasswordSame(password, repeatPassword))
    setRepeatPassword(repeatPassword)
  }

  const signUp = async () => {
    if (!isEmailValid || !isPasswordValid || !isPasswordSame) return

    try {
      const response = await auth({ email, password, repeatPassword })
      console.log(response)
      response ? signIn() : setEmailExistsError(true)
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return (
    <>
      <div className={style.form}>
        {emailExistsError && <ShowErr ErrText={t('AUTH_ALREADY_REGISTERED')} />}
        <Input
          type="email"
          placeholder={t('AUTH_EMAIL')}
          value={email}
          onChange={setEmail}
          onBlur={email => setIsEmailValid(getEmailValidation(email))}
        />
        {!isEmailValid && <ShowErr ErrText={t('AUTH_EMAIL_NOT_VALID')} />}
        <Input
          type="password"
          placeholder={t('AUTH_PASSWORD')}
          value={password}
          onChange={passwordChangeHandler}
        />
        {!isPasswordValid && <ShowErr ErrText={t('AUTH_PASSWORD_NOT_VALID')} />}
        <Input
          type="password"
          placeholder={t('AUTH_REPEAT_PASSWORD')}
          value={repeatPassword}
          onChange={repeatPasswordChangeHandler}
        />
        {!isPasswordSame && <ShowErr ErrText={t('AUTH_PASSWORD_NOT_SAME')} />}
      </div>
      <AuthButton title={t('AUTH_SIGN_UP')} onClick={signUp} />
      <SignUpFooter />
    </>
  )
}
