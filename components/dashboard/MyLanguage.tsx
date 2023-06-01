import { FC } from 'react'
import { useRouter } from 'next/router'
import Image from 'next/image'
import style from './MyLanguage.module.scss'

interface Props {
  item: {
    _id: string
    nameCode: string
    standards: any[]
  }
  index: number
  active: number
  changeActive: (index: number) => void
  t: any
  LANGUAGE_NAMES: {
    [key: string]: string
  }
}

interface KaTextStyle {
  fontWeight: string
  fontFamily: string
}

const MyLanguage: FC<Props> = ({
  item,
  index,
  active,
  changeActive,
  t,
  LANGUAGE_NAMES,
}) => {
  const router = useRouter()
  const locale = router.locale ?? 'en'

  const kaTextStyle: KaTextStyle = {
    fontWeight: '500',
    fontFamily: 'bpg_arial_2009',
  }

  return (
    <button
      onClick={() => changeActive(index)}
      className={
        active === index ? style.my_language_active : style.my_language
      }
    >
      <div className={style.flag_and_course}>
        <Image
          className={style.flag_img}
          src={`/assets/images/flags/circle/big/${[
            LANGUAGE_NAMES[item.nameCode],
          ]}.png`}
          alt={`${LANGUAGE_NAMES[item.nameCode]} icon`}
          width={36}
          height={36}
        />
        {locale === 'ka' ? (
          <h3 style={kaTextStyle}>{t(LANGUAGE_NAMES[item.nameCode])}</h3>
        ) : (
          <h3>{t(LANGUAGE_NAMES[item.nameCode])}</h3>
        )}
      </div>
      <p className={style.progress}>
        0<span className={style.percent}>%</span>
      </p>
    </button>
  )
}

export default MyLanguage
