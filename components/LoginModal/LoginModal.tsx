import { FC, useState } from 'react'
import style from './LoginModal.module.scss'
import Foco from 'react-foco'
import { NetworkButtons } from './NetworkButtons'
import classNames from 'classnames'
import { useTranslation } from '../../utils/useTranslation'
import { Input } from './Input'
import { Tab } from './Tab'
import { LoginFooter } from './LoginFooter'

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

          <div className={style.form}>
            <Input type="email" placeholder={t('loginEmail')} />
            <Input type="password" placeholder={t('loginPassword')} />
            {tab === 'signUp' && (
              <Input type="password" placeholder={t('loginRepeatPassword')} />
            )}
          </div>

          {tab === 'signIn' && (
            <>
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
              <div className={classNames(style.button, style.disabled)}>
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
