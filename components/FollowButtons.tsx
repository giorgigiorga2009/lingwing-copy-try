import { FC } from "react";
import style from './FollowButtons.module.scss'
import classnames from "classnames";
import { useIntl } from "react-intl";
import { useTranslation } from "../utis/useTranslation";

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
  const {t} = useTranslation()

  return (
    <div className={style.wrap}>
      <div className={style.text}>{t("FOLLOW_US")}</div>
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