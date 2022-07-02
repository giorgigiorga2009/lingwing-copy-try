import { FC } from "react";
import styles from './SingUp.module.scss'

export const SingUp: FC = () => {
  return (
    <>
      <div className={styles.form}>
        <input className={styles.input} type="email" name="email" placeholder="E-mail" pattern="/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"></input>
        <input className={styles.input} type="password" name="password" placeholder="Password"></input>
        <input className={styles.input} type="password" name="password" placeholder="Repeat password"></input>
      </div>
      <div className={styles.button} >SING UP</div>
      <div className={styles.agreement}> By registering, you agree to the terms of the <span className={styles.link}>License Agreement</span> and the <span className={styles.link}> Privacy Policy</span></div>
    </>
  )
}