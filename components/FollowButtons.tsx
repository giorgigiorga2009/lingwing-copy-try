import { FC } from 'react'
import style from './FollowButtons.module.scss'
import classNames from 'classnames'
import { useTranslation } from '../utils/useTranslation'
import { FOLLOW_NETWORKS } from '../utils/const'

type Networks = keyof typeof FOLLOW_NETWORKS
const KEY_NETWORKS = Object.keys(FOLLOW_NETWORKS) as Networks[]

export const FollowButtons: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.wrap}>
      <div className={style.text}>{t('FOLLOW_US')}</div>
      <div className={style.container}>
        {KEY_NETWORKS.map(label => (
          <a
            href={FOLLOW_NETWORKS[label]}
            key={label}
            className={classNames(style.followButton, style[label])}
          />
        ))}
      </div>
    </div>
  )
}
