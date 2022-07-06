import { FC } from "react";
import styles from './NetworkButtons.module.scss'
import classnames from "classnames";

const NETWORKS = [
  ['facebook', 'https://www.facebook.com/lingwingcom'],
  ['instagram', 'https://www.instagram.com/lingwingcom/'],
  ['linkedin', 'https://www.linkedin.com/company/lingwing'],
  ['youtube', 'https://www.youtube.com/channel/UCQTfPDnmBcLbZueYTM8pNZA'],
  ['tiktok', 'https://www.tiktok.com/@lingwing.georgia']
]

type Networks = typeof NETWORKS[number]

interface FollowProps {
  label: Networks
}

const Button: FC<FollowProps> = ({ label }) => {
  return (
    <a href={label[1]}  className={classnames(styles.followButton, styles[label[0]])} />
  )
}

export const NetworkButtons: FC = () => {
  return (
    <div className={styles.container}>
      {NETWORKS.map((element) => {
        return (
          <Button label={element} key={element[0]} />
        )
      })}
    </div>
  )
}