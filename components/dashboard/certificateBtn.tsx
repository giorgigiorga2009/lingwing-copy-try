import React from 'react'
import style from '@components/dashboard/certificateBtn.module.scss'
import { useTranslation } from '@utils/useTranslation'
import Image from 'next/image'
import certificateImage from '@public/themes/images/v1/svg/gold-certificate.svg'

type CertificateBtnProps = {
  userCourseId: any
}

const CertificateBtn: React.FC<CertificateBtnProps> = ({ userCourseId }) => {
  const { t } = useTranslation()

  return (
    <div className={style.container}>
      <a
        href={`/certificate?userCourseId=${userCourseId}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <button className={style.certificateButton}>{t('Certificate')}</button>
        <div className={style.imgContainer}>
          <Image
            className={style.img}
            src={certificateImage}
            alt=""
            height={1000}
            width={1000}
          />
        </div>
      </a>
    </div>
  )
}

export default CertificateBtn
