import Link from 'next/link'
import Swal from 'sweetalert2'
import { FC, useState } from 'react'
import style from './ActionBtns.module.scss'
import { resetCourse } from '@utils/deleteCourse'
import { useTranslation } from '@utils/useTranslation'

interface ActionBtnsProps {
  rating: number
  allPassedTasks: number
  token?: string
  slug: string
  onResetCourse?: () => void
}

const ActionBtns: FC<ActionBtnsProps> = ({
  rating,
  allPassedTasks,
  token,
  slug,
  onResetCourse,
}) => {
  const { t } = useTranslation()
  const [randomNumbers] = useState(
    [Math.floor(Math.random() * 9000) + 1000].map(String),
  )

  const handleResetButton = async () => {
    const result = await Swal.fire({
      title: t('SWAL_RESET_COUSE_TITLE'),
      text: t('SWAL_RESET_COUSE_TEXT'),
      icon: 'warning',
      showConfirmButton: true,
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonColor: 'rgb(105 46 150)',
      confirmButtonText: t('SWAL_RESET_BTN_OK'),
      cancelButtonText: t('SWAL_RESET_CLOSE_BUTTON'),
    })

    if (result.isConfirmed) {
      const secondChance = await Swal.fire({
        title: `${t('SWAL_RESET_PROGRESS')}: \n${t(
          'SWAL_RESET_SCORE',
        )} - ${allPassedTasks}\n${t('SWAL_RESET_RATING')} - ${rating}`,
        text: t('SWAL_RESET_COUSE_TEXT'),
        icon: 'info',
        confirmButtonColor: 'rgb(105 46 150)',
        confirmButtonText: t('SWAL_RESET_BTN_OK'),
        cancelButtonText: t('SWAL_RESET_CLOSE_BUTTON'),
        showCloseButton: true,
        showCancelButton: true,
      })

      if (secondChance.isConfirmed) {
        const finalWarning = await Swal.fire({
          title: 'Enter Numbers',
          html: `
            <p>Enter the following numbers: ${randomNumbers}</p>
            <input id="swal-input" type="text" placeholder="Type numbers">
          `,
          showCancelButton: true,
          confirmButtonText: t('SWAL_RESET_BTN_OK'),
          cancelButtonText: t('SWAL_RESET_CLOSE_BUTTON'),
          showCloseButton: true,
          focusConfirm: false,
          preConfirm: () => {
            const inputValue = (
              document.getElementById('swal-input') as HTMLInputElement
            )?.value

            if (inputValue === randomNumbers[0]) {
              return true
            } else {
              Swal.showValidationMessage('Numbers do not match')
              return false
            }
          },
        })

        if (finalWarning.isConfirmed) {
          try {
            await resetCourse({ slug, token })
            onResetCourse?.()
          } catch (error) {
            console.error('Failed to delete course:', error)
          }
        }
      }
    }
  }

  return (
    <div className={style.container}>
      <Link href={`#`}>
        <button className={style.statistics}></button>
      </Link>
      <Link href={`#`}>
        <button
          className={style.reset}
          onClick={handleResetButton}
          data-i18n-reset={t('SWAL_RESET_RESET')}
          disabled={allPassedTasks === 0}
        ></button>
      </Link>
      <Link href={`#`}>
        <button className={style.info}></button>
      </Link>
    </div>
  )
}

export default ActionBtns
