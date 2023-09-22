import React from 'react'
import style from '@components/dashboard/certificateBtn.module.scss'
import { useTranslation } from '@utils/useTranslation'
import Image from 'next/image'
import certificateImage from '@public/themes/images/v1/svg/gold-certificate.svg'

const CertificateBtn = () => {
  const { t } = useTranslation()
  return (
    <div className={style.container}>
      <button className={style.certificateButton}>
        {t('Certificate')}
      </button>
      <div className={style.imgContainer}>
          <Image
            className={style.img}
            src={certificateImage}
            alt=""
            height={2000}
            width={2000}
          />
      </div>
    </div>
  )
}

export default CertificateBtn
