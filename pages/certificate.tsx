import React, { useEffect, useState } from 'react'
import { getCertificate } from '@utils/getCertificate'
import style from '@pages/certificate.module.scss'
import Image from 'next/image'
import certificateBg from '/public/themes/images/v2/certificate/bg.png'
import containerBg from '/public/themes/images/v2/certificate/bg-l.png'
import logoImage from '/public/themes/images/v2/certificate/logo.png'
import parrotImage from '/public/themes/images/v2/certificate/user-parrot.png'
import footerImage from '/public/themes/images/v2/certificate/footer.png'
import bulletLineImage from '/public/themes/images/v2/certificate/bullet-line.png'
import signatureImage from '/public/themes/images/v2/certificate/signature.png'
import { generateCertificateTextProps } from '@utils/getCertificate'
import { useRouter } from 'next/router'


const generateCertificateText = (data: generateCertificateTextProps) => {
   
  return (
    <div className={style.certificateBody}>
      <div className={style.certificateBg}>
        <Image src={certificateBg} alt="" className={style.bg} />
        <div className={style.container}>
          <Image src={containerBg} alt="" className={style.bgI} />
          <div className={style.logo}>
            <div className={style.img}>
              <Image src={logoImage} alt="" />
            </div>
          </div>
          <div className={style.textSection}>
            <div className={style.textF}>
              <h3>Foreign Language Online Learning</h3>
            </div>
            <div className={style.text}>
              <h3>
                <span>{data.languageName}</span> Language Course
              </h3>
            </div>
            <div className={style.textCr}>
              <h1 className={style._HFont}>CERTIFICATE OF COMPLETION</h1>
            </div>
            <div className={style.text}>
              <h3>This is to certify that</h3>
            </div>
            <div className={style.user}>
              <h2 className={style._HFont}>
                {data.firstName} {data.lastName}
              </h2>
            </div>
            <div className={style.text}>
              <h4 className={style.completed}>
                has successfully completed <span>{data.languageName}</span>{' '}
                language online course
              </h4>
            </div>
            <div className={style.textM}>
              <h4>
                Course Level: <span>{data.level}</span>
              </h4>
            </div>
            <div className={style.textM}>
              <h4>
                Rating: <span>{data.rating}</span>
              </h4>
            </div>
            <Image
              src={parrotImage}
              alt=""
              className={style.parrot}
              width={1000}
              height={1000}
            />
          </div>
          <div className={style.footer}>
            <div className={style.left}>
              <div className={style.textBox}>
                <div>
                  <h4>Course Completion period:</h4>
                </div>
                <div>
                  <h4>
                    {data.coursePeriod.start.month}/
                    {data.coursePeriod.start.year} -{' '}
                    {data.coursePeriod.end.month}/{data.coursePeriod.end.year}
                  </h4>
                </div>
              </div>
            </div>
            <div className={style.center}>
              <div className={style.img}>
                <Image src={footerImage} alt="" className={style.logo} />
              </div>
            </div>
            <div className={style.right}>
              <div className={style.signatureLine}>
                <Image
                  src={bulletLineImage}
                  alt=""
                  className={style.bullet}
                  width={200}
                  height={3}
                />
                <div className={style.signature}>
                  <Image src={signatureImage} alt="" className={style.icon} />
                </div>
              </div>
              <div className={style.text}>
                <h4>Director</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

const CertificatePage = () => {
  const [certificateData, setCertificateData] = useState(null)
  const router = useRouter()
  const { userCourseId } = router.query
  useEffect(() => {
    if (typeof userCourseId === 'string') {
        getCertificate(userCourseId)
          .then(data => {
            setCertificateData(data)
          })
          .catch(error => {
            console.error('Error fetching certificate:', error)
          })
      }
    }, [userCourseId])

  if (!certificateData)
    return <div>Error fetching certificate. Please try again later.</div>

  return (
    <div className={style.certificateWrapper}>
      {generateCertificateText(certificateData)}
    </div>
  )
}

export default CertificatePage
