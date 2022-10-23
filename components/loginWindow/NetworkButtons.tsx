import { FC } from 'react'
import style from './NetworkButtons.module.scss'
import classNames from 'classnames'
import { useTranslation } from '../../utils/useTranslation'
import { LOGIN_NETWORKS } from '../../utils/const'

interface Props {
  isSignInTab: boolean
}

export const NetworkButtons: FC<Props> = ({ isSignInTab }) => {
  const { t } = useTranslation()
  return (
    <div className={style.container}>
      {LOGIN_NETWORKS.map(network => (
        <div className={classNames(style.button, style[network])} key={network}>
          <div className={style.icon} />
          <div className={style.text}>
            <span>
              {isSignInTab ? t('loginSignInWith') : t('loginSignUpWith')}
            </span>
            <span className={style.network}>{network}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
