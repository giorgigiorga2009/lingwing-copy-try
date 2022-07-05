import { FC, useState } from 'react'
import styles from './MenuButton.module.scss'
import classnames from 'classnames'
import Foco from 'react-foco'
import { SideMenu } from './SideMenu'





const MenuButton: FC = () => {
  const [open, setOpen] = useState(false)

  return (
    <div className={styles.menuContainer}>
      <div className={styles.button} onClick={() => setOpen(true)}/>
      <a className={styles.link} href="https://lingwing.com/en/">
        <div className={styles.logo} />
      </a>
      {open && (
        <SideMenu 
          onClose={() => setOpen(false)}
        />
        
      )}
    </div >
  )
}

export default MenuButton