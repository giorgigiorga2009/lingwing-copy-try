import { FC } from 'react'
import classNames from 'classnames'
import { LOGIN_NETWORKS } from '@utils/const'
import style from './NetworkButtons.module.scss'
import { useTranslation } from '@utils/useTranslation'

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
              {isSignInTab ? t('AUTH_SIGN_IN_WITH') : t('AUTH_SIGN_UP_WITH')}
            </span>
            <span className={style.network}>{network}</span>
          </div>
        </div>
      ))}
    </div>
  )
}
