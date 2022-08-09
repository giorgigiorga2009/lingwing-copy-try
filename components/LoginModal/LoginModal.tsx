import { FC, useState } from 'react'
import style from './LoginModal.module.scss'
import Foco from 'react-foco'
import { NetworkButtons } from './NetworkButtons'
import classNames from 'classnames'
import { SignInPart } from './SignInPart'
import { SignUpPart } from './SignUpPart'
import { useTranslation } from '../../utils/useTranslation'

interface Props {
  onClick: () => void
}

export const LoginModal: FC<Props> = ({ onClick }) => {
  const [isSignInTab, setSignInTab] = useState(true)
  const { t } = useTranslation()

  return (
    <div className={style.wrapper}>
      <Foco component="div" onClickOutside={onClick} className={style.modal}>
        <div className={style.modalHeader}>
          <div
            className={classNames(
              style.headerButton,
              isSignInTab && style.active,
            )}
            onClick={() => setSignInTab(true)}
          >
            {t('AUTH_LOGIN')}
          </div>
          <div
            className={classNames(
              style.headerButton,
              !isSignInTab && style.active,
            )}
            onClick={() => setSignInTab(false)}
          >
            {t('REGISTER')}
          </div>
          <div className={style.close} onClick={onClick} />
        </div>
        <NetworkButtons isSignInTab={isSignInTab} />
        <div className={style.divider}>
          <span className={style.line} />
          <span>{t('AUTH_SOC_MEDIA')}</span>
          <span className={style.line} />
        </div>
        {isSignInTab ? <SignInPart /> : <SignUpPart />}
      </Foco>
    </div>
  )
}
