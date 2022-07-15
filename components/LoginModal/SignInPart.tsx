import { FC } from "react";
import styles from './SignInPart.module.scss'

export const SignInPart: FC = () => {
  return (
    <>
      <div className={styles.form}>
        <input 
          className={styles.input} 
          type="email" 
          placeholder="E-mail" 
          pattern="/^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/i"
        />
        <input 
          className={styles.input} 
          type="password" 
          placeholder="Password"
        />
      </div>
      <div className={styles.button}> SING IN </div>
      <div className={styles.additionalText}>
        Forgot <span className={styles.link}>Password?</span> 
      </div>
    </>
  )
}