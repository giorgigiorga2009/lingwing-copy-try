import { Tab } from './Tab'
import Foco from 'react-foco'
import { SignUp } from './SignUp'
import { SignIn } from './SignIn'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { useRouter } from 'next/router'
import { signIn } from 'next-auth/react'
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
  lighterBG?: boolean
  onClick: () => void
  className?: string
  openLogin: boolean
  setOpenLogin: (bool: boolean) => void
}

export const LoginModal: FC<Props> = ({
  onClick,
  openLogin,
  setOpenLogin,
  lighterBG,
}) => {
  const router = useRouter()
  const { t } = useTranslation()
  const [tab, setTab] = useState<Tab>('signUp')
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [emailNotFound, setEmailNotFound] = useState<boolean>(false)

  const signInto = async () => {
    try {
      const response = await signIn('credentials', {
        email,
        password,
        callbackUrl: '/dashboard',
        redirect: false,
      })

      if (response?.ok === false) {
        setEmailNotFound(true)
      } else {
        setOpenLogin(!openLogin)
        router.push({ pathname: '/dashboard' })
      }
    } catch (error) {
      console.log((error as Error).message)
    }
  }

  return (
    <FocusTrap>
      <div
        className={classNames(style.wrapper, { [style.lighterBG]: lighterBG })}
      >
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
                signIn={signInto}
                err={emailNotFound}
                email={email}
                setEmail={setEmail}
                password={password}
                setPassword={setPassword}
              />
            )}
            {tab === 'signUp' && (
              <SignUp
                signIn={signInto}
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
