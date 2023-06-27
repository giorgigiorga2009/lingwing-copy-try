import { Tab } from './Tab'
import Foco from 'react-foco'
import { Input } from './Input'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import FocusTrap from 'focus-trap-react'
import { AuthButton } from './AuthButton'
import { SignUpFooter } from './SignUpFooter'
import style from './LoginModal.module.scss'
import { NetworkButtons } from './NetworkButtons'
import { useTranslation } from '@utils/useTranslation'
import ShowErr from '@components/shared/ShowInputError'

import {
  getEmailValidation,
  getIsPasswordSame,
  getPasswordValidation,
} from '@utils/validations'
import { auth, login } from '@utils/auth'

type Tab = 'signIn' | 'signUp'

const Divider: FC = () => {
  const { t } = useTranslation()
  return (
    <div className={style.divider}>
      <span className={style.line} />
      <span>{t('AUTH_OR_WITH')}</span>
      <span className={style.line} />
    </div>
  )
}

interface Props {
  onClick: () => void
  className?: string
  openLogin: boolean
  setOpenLogin: (bool: boolean) => void
}

export const LoginModal: FC<Props> = ({
  onClick,
  className,
  openLogin,
  setOpenLogin,
}) => {
  const [tab, setTab] = useState<Tab>('signIn')
  const router = useRouter()
  const { t } = useTranslation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const [isEmailValid, setIsEmailValid] = useState<boolean>(true)
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>(true)
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>(true)

  const [emailExistsError, setEmailExistsError] = useState<boolean>(false)
  const [emailNotFound, setEmailNotFound] = useState<boolean>(false)

  const passwordChangeHandler = (password: string) => {
    setIsPasswordValid(getPasswordValidation(password))
    setPassword(password)
  }

  const repeatPasswordChangeHandler = (repeatPassword: string) => {
    setIsPasswordSame(getIsPasswordSame(password, repeatPassword))
    setRepeatPassword(repeatPassword)
  }

  const signUp = async () => {
    if (!isEmailValid || !isPasswordSame) return

    try {
      const response = await auth({ email, password, repeatPassword })
      response ? signIn() : setEmailExistsError(true)
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  const signIn = async () => {
    if (!isEmailValid || !isPasswordValid) return

    try {
      const response = await login({ email, password })

      if (response) {
        localStorage.setItem('authToken', response)
        router.push('/dashboard')
        setOpenLogin(!openLogin)
      } else {
        setEmailNotFound(true)
      }
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return (
    <FocusTrap>
      <div className={style.wrapper}>
        <Foco
          component="div"
          onClickOutside={onClick}
          className={classNames(style.modal)}
        >
          <div className={style.modalHeader}>
            <Tab
              onClick={() => setTab('signIn')}
              isActive={tab === 'signIn'}
              text={t('AUTH_SIGN_IN')}
            />
            <Tab
              onClick={() => setTab('signUp')}
              isActive={tab === 'signUp'}
              text={t('AUTH_SIGN_UP')}
            />
            <button className={style.close} onClick={onClick} />
          </div>

          <div className={style.content}>
            <NetworkButtons isSignInTab={tab === 'signIn'} />
            <Divider />
            {tab === 'signIn' && (
              <>
                <div className={style.form}>
                  {emailNotFound && (
                    <ShowErr ErrText={t('AUTH_EMAIL_NOT_FOUND')} />
                  )}
                  <Input
                    type="email"
                    placeholder={t('AUTH_EMAIL')}
                    value={email}
                    onChange={setEmail}
                    onBlur={email => setIsEmailValid(getEmailValidation(email))}
                  />
                  {!isEmailValid && (
                    <ShowErr ErrText={t('AUTH_EMAIL_NOT_VALID')} />
                  )}
                  <Input
                    type="password"
                    placeholder={t('AUTH_PASSWORD')}
                    value={password}
                    onChange={passwordChangeHandler}
                  />
                  {!isPasswordValid && (
                    <ShowErr ErrText={t('AUTH_PASSWORD_NOT_VALID')} />
                  )}
                </div>
                <div className={style.bottomWrapper}>
                  <a className={style.forgotPasswordLink}>
                    {t('AUTH_FORGET_PASSWORD')}
                  </a>
                  <AuthButton title={t('AUTH_SIGN_IN')} onClick={signIn} />
                </div>
              </>
            )}

            {tab === 'signUp' && (
              <>
                <div className={style.form}>
                  {emailExistsError && (
                    <ShowErr ErrText={t('AUTH_ALREADY_REGISTERED')} />
                  )}

                  <Input
                    type="email"
                    placeholder={t('AUTH_EMAIL')}
                    value={email}
                    onChange={setEmail}
                    onBlur={email => setIsEmailValid(getEmailValidation(email))}
                  />
                  {!isEmailValid && (
                    <ShowErr ErrText={t('AUTH_EMAIL_NOT_VALID')} />
                  )}
                  <Input
                    type="password"
                    placeholder={t('AUTH_PASSWORD')}
                    value={password}
                    onChange={passwordChangeHandler}
                  />
                  {!isPasswordValid && (
                    <ShowErr ErrText={t('AUTH_PASSWORD_NOT_VALID')} />
                  )}
                  <Input
                    type="password"
                    placeholder={t('AUTH_REPEAT_PASSWORD')}
                    value={repeatPassword}
                    onChange={repeatPasswordChangeHandler}
                  />
                  {!isPasswordSame && (
                    <ShowErr ErrText={t('AUTH_PASSWORD_NOT_SAME')} />
                  )}
                </div>
                <AuthButton title={t('AUTH_SIGN_UP')} onClick={signUp} />
                <SignUpFooter />
              </>
            )}
          </div>
        </Foco>
      </div>
    </FocusTrap>
  )
}
