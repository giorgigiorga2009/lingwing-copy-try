import { Tab } from './Tab'
import Foco from 'react-foco'
import { SignUp } from './SignUp'
import { SignIn } from './SignIn'
import { login } from '@utils/auth'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import FocusTrap from 'focus-trap-react'
import style from './LoginModal.module.scss'
import { NetworkButtons } from './NetworkButtons'
import { useTranslation } from '@utils/useTranslation'

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

export const LoginModal: FC<Props> = ({ onClick, openLogin, setOpenLogin }) => {
  const [tab, setTab] = useState<Tab>('signIn')
  const router = useRouter()
  const { t } = useTranslation()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailNotFound, setEmailNotFound] = useState<boolean>(false)

  const signIn = async () => {
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
              <SignIn
                signIn={signIn}
                err={emailNotFound}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            )}
            {tab === 'signUp' && (
              <SignUp
                signIn={signIn}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            )}
          </div>
        </Foco>
      </div>
    </FocusTrap>
  )
}
