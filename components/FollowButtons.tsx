import { FC } from "react";
import style from './FollowButtons.module.scss'
import classnames from "classnames";
import { useIntl } from "react-intl";

const NETWORKS = {
  facebook: 'https://www.facebook.com/lingwingcom',
  instagram: 'https://www.instagram.com/lingwingcom/',
  linkedin: 'https://www.linkedin.com/company/lingwing',
  youtube: 'https://www.youtube.com/channel/UCQTfPDnmBcLbZueYTM8pNZA',
  tiktok: 'https://www.tiktok.com/@lingwing.georgia'
}

type Networks = keyof typeof NETWORKS

const KEY_NETWORKS = Object.keys(NETWORKS) as Networks[]

export const FollowButtons: FC = () => {
  const intl = useIntl()
  const followUs = intl.formatMessage({ id: "FOLLOW_US" })
  return (
    <div className={style.wrap}>
      <div className={style.text}>{followUs}</div>
      <div className={style.container} >
        {KEY_NETWORKS.map(label => (
          <a href={NETWORKS[label]}
            key={label}
            className={classnames(style.followButton, style[label])}
          />
        ))}
      </div>
    </div>
  )
}