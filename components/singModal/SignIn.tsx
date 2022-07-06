import { FC } from "react";
import styles from './SignIn.module.scss'

export const SignIn: FC = () => {
  return (
    <>
      <div className={styles.form}>
        <input className={styles.input} type="email" name="email" placeholder="E-mail" pattern="/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"></input>
        <input className={styles.input} type="password" name="password" placeholder="Password"></input>
      </div>
      <div className={styles.button}> SING IN </div>
      <div className={styles.additionalText}>Forgot <span className={styles.link}>Password?</span> </div>
    </>
  )
}