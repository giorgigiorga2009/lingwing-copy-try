import { FC } from 'react'
import style from './Features.module.scss'
import Image from 'next/image'
import tick from '../../public/themes/images/V2/Packages/tick.svg'
import x from '../../public/themes/images/V2/Packages/x.svg'
import { useTranslation } from '../../utils/useTranslation'

interface TickOrX {
  feature: boolean
}

interface Features {
  feature: {
    tasks: number
    certificate: boolean
    grammarAndStatistics: boolean
    voiceRecognition: boolean
  }
}

const TickOrX: FC<TickOrX> = ({ feature }) => {
  return (
    <>
      {feature ? (
        <Image src={tick} height="30" width="30" />
      ) : (
        <Image src={x} height="30" width="30" />
      )}
    </>
  )
}

export const FeatureDescs: FC = () => {
  const { t } = useTranslation()

  return (
    <div className={style.featureDescContainer}>
      <div className={style.featureDesc}>
        {t('APP_PACKAGE_DAILY_NUMBER_OF_TASKS')}
      </div>
      <div className={style.featureDesc}>{t('APP_PACKAGE_CERTIFICATE')}</div>
      <div className={style.featureDesc}>
        {t('APP_PACKAGE_ALL_LANGS_AND_COURSES')}
      </div>
      <div className={style.featureDesc}>
        {t('APP_PACKAGE_VOICE_RECOGNITION')}
      </div>
    </div>
  )
}

export const Features: FC<Features> = ({
  feature: { tasks, certificate, grammarAndStatistics, voiceRecognition },
}) => {
  const { t } = useTranslation()

  return (
    <div className={style.featureContainer}>
      <div>{tasks === -1 ? t('APP_PACKAGE_UNLIMITED') : tasks}</div>
      <div>{<TickOrX feature={certificate} />}</div>
      <div>{<TickOrX feature={grammarAndStatistics} />}</div>
      <div>{<TickOrX feature={voiceRecognition} />}</div>
    </div>
  )
}
