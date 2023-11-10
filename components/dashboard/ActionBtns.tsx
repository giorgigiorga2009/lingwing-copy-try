import { FC } from 'react'
import Link from 'next/link'
import style from './ActionBtns.module.scss'
import Swal from 'sweetalert2'
import { resetCourse } from '@utils/deleteCourse'
import { useTranslation } from '@utils/useTranslation'

interface ActionBtnsProps {
  rating: number
  allPassedTasks: string
  token?: string
  slug: string
}

const ActionBtns: FC<ActionBtnsProps> = ({
  rating,
  allPassedTasks,
  token,
  slug,
}) => {
 const {t} = useTranslation()

  const handleResetButton = async () => {
    const result = await Swal.fire({
      title: t("SWAL_RESET_COUSE_TITLE"),
      text: t("SWAL_RESET_COUSE_TEXT"),
      icon: 'warning',
      showConfirmButton: true,
      showCloseButton: true,
      confirmButtonColor: 'rgb(105 46 150)',
      confirmButtonText: 'OK',
    })

    if (result.isConfirmed) {
      const secondChance = await Swal.fire({
        title: `${t("SWAL_RESET_PROGRESS")}: \n${t("SWAL_RESET_SCORE")} - ${allPassedTasks}\n${t("SWAL_RESET_RATING")} - ${rating}`,
        text: t("SWAL_RESET_COUSE_TEXT"),  
        icon: 'info',
        confirmButtonColor: 'rgb(105 46 150)',
        confirmButtonText: 'OK',
      })

      if (secondChance.isConfirmed) {
        try {
          await resetCourse({ slug, token })
          // window.location.reload() // needs to refresh but window is the last call
        } catch (error) {
          console.error('Failed to delete course:', error)
        }
      }
    }
  }

  return (
    <>
      <div className={style.container}>
        <Link href={`#`}>
          <button className={style.statistics}></button>
        </Link>
        <Link href={`#`}>
          <button className={style.reset} onClick={handleResetButton}></button>
        </Link>
        <Link href={`#`}>
          <button className={style.info}></button>
        </Link>
      </div>
    </>
  )
}

export default ActionBtns

