import { FC, useState } from 'react'
import style from './LoginModal.module.scss'
import Foco from 'react-foco'
import { NetworkButtons } from './NetworkButtons'
import classNames from 'classnames'
import { useTranslation } from '../../utils/useTranslation'
import { Input } from './Input'
import { Tab } from './Tab'
import { LoginFooter } from './LoginFooter'

import {
  getEmailValidation,
  getIsPasswordSame,
  getPasswordValidation,
} from '../../utils/validations'
import { auth, getToken } from '../../utils/auth'

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
}

export const LoginModal: FC<Props> = ({ onClick, className }) => {
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
              <div className={classNames(style.button, style.disabled)}>
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
              <div
                className={classNames(style.button, style.disabled)}
                onClick={signUp}
              >
                {t('loginSignUp')}
              </div>
              <LoginFooter />
            </>
          )}
        </div>
      </Foco>
    </div>
  )
}
