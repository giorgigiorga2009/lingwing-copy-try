import { Tab } from './Tab'
import Foco from 'react-foco'
import { Input } from './Input'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { LoginFooter } from './LoginFooter'
import style from './LoginModal.module.scss'
import { NetworkButtons } from './NetworkButtons'
import { useTranslation } from '@utils/useTranslation'

import {
  getEmailValidation,
  getIsPasswordSame,
  getPasswordValidation,
} from '@utils/validations'
import { auth, getToken, login } from '@utils/auth'

type Tab = 'signIn' | 'signUp'

const Divider: FC = () => {
  const { t } = useTranslation()
  return (
    <div className={style.divider}>
      <span className={style.line} />
      <span>{t('loginOrWith')}</span>
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
  const { t } = useTranslation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [repeatPassword, setRepeatPassword] = useState<string>('')

  const [isEmailValid, setIsEmailValid] = useState<boolean>()
  const [isPasswordValid, setIsPasswordValid] = useState<boolean>()
  const [isPasswordSame, setIsPasswordSame] = useState<boolean>()

  const signUp = () => {
    const isPasswordCorrect = password === repeatPassword
    if (!isEmailValid || !isPasswordCorrect) return

    return auth({ email, password, repeatPassword }).then(response =>
      console.log(response),
    )
  }

  const signIn = () => {
    return login({ email, password }).then(response => {
      localStorage.setItem('authToken', response)
      setOpenLogin(!openLogin)
      console.log(response, 'response token')
    })
  }

  return (
    <div className={style.wrapper}>
      <Foco
        component="div"
        onClickOutside={onClick}
        className={classNames(style.modal, className)}
      >
        <div className={style.modalHeader}>
          <Tab
            onClick={() => setTab('signIn')}
            isActive={tab === 'signIn'}
            text={t('loginSignIn')}
          />
          <Tab
            onClick={() => setTab('signUp')}
            isActive={tab === 'signUp'}
            text={t('loginSignUp')}
          />
          <div className={style.close} onClick={onClick} />
        </div>

        <div className={style.content}>
          <NetworkButtons isSignInTab={tab === 'signIn'} />
          <Divider />

          {tab === 'signIn' && (
            <>
              <div className={style.form}>
                <Input
                  type="email"
                  placeholder={t('loginEmail')}
                  value={email}
                  onChange={setEmail}
                />
                <Input
                  type="password"
                  placeholder={t('loginPassword')}
                  value={password}
                  onChange={setPassword}
                />
              </div>
              <div
                className={classNames(style.button, style.disabled)}
                onClick={signIn}
              >
                {t('loginSignIn')}
              </div>
              <a className={style.forgotPasswordLink}>
                {t('loginForgotPassword')}
              </a>
            </>
          )}

          {tab === 'signUp' && (
            <>
              <div className={style.form}>
                <Input
                  type="email"
                  placeholder={t('loginEmail')}
                  value={email}
                  onChange={setEmail}
                  onBlur={email => setIsEmailValid(getEmailValidation(email))}
                />
                {isEmailValid === false && (
                  <span className={style.error}> {t('emailNotValid')} </span>
                )}
                <Input
                  type="password"
                  placeholder={t('loginPassword')}
                  value={password}
                  onChange={setPassword}
                  onBlur={password =>
                    setIsPasswordValid(getPasswordValidation(password))
                  }
                />
                {isPasswordValid === false && (
                  <span className={style.error}>{t('passwordNotValid')} </span>
                )}
                <Input
                  type="password"
                  placeholder={t('loginRepeatPassword')}
                  value={repeatPassword}
                  onChange={setRepeatPassword}
                  onBlur={repeatPassword =>
                    setIsPasswordSame(
                      getIsPasswordSame(password, repeatPassword),
                    )
                  }
                />
                {isPasswordSame === false && (
                  <span className={style.error}>{t('passwordNotSame')}</span>
                )}
              </div>
              <button className={classNames(style.button)} onClick={signUp}>
                {t('loginSignUp')}
              </button>
              <LoginFooter />
            </>
          )}
        </div>
      </Foco>
    </div>
  )
}
