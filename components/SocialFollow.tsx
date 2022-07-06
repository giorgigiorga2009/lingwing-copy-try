import { FC } from "react";
import styles from './SocialFollow.module.scss'
import classnames from "classnames";

const SOCIALS = [
  ['facebook', 'https://www.facebook.com/lingwingcom'],
  ['instagram', 'https://www.instagram.com/lingwingcom/'],
  ['linkedin', 'https://www.linkedin.com/company/lingwing'],
  ['youtube', 'https://www.youtube.com/channel/UCQTfPDnmBcLbZueYTM8pNZA'],
  ['tiktok', 'https://www.tiktok.com/@lingwing.georgia']
]

type Socials = typeof SOCIALS[number]

interface FollowProps {
  social: string[]
}

const FollowButton: FC<FollowProps> = ({ social }) => {
  return (
    <div key={social[0]} className={classnames(styles.followButton, styles[social[0]])} >
      <a href={social[1]} className={styles.link} />
    </div>
  )
}

export const SocialFollow: FC = () => {
  return (
    <div className={styles.container}>
      {SOCIALS.map((element) => {
        return (
          <FollowButton social={element} />
        )
      })}
    </div>
  )
}