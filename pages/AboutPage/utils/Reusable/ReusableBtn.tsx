import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import style from "./Reusable.module.scss"



const ReusableBtn: React.FC = () => {
  const router = useRouter()
  const locale = router.locale ?? 'en'

  return (
    <Link href={`lessons?languageTo=eng&languageFrom=geo&courseName=english_a1-1`}>
      <button className={style.button}>
        დაიწყე სწავლა
      </button>
    </Link>
  )
}

export default ReusableBtn
