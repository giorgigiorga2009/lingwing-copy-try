import { FC, SetStateAction, useState } from 'react'
import style from './Coupon.module.scss'
import { PackageButton } from './PackageButton'
import { useTranslation } from '../../utils/useTranslation'

interface Props {
  coupon(coupon: string): void
}

const Coupon: FC<Props> = ({ coupon }) => {
  const { t } = useTranslation()
  const [couponInputText, setCouponInputText] = useState('')

  const handleChange = (event: {
    target: { value: SetStateAction<string> }
  }) => {
    setCouponInputText(event.target.value)
  }

  const handleClick = () => {
    coupon(couponInputText)
  }

  return (
    <div className={style.coupon__container}>
      <p className={style.coupon__title}>{t('COUPON_DO_YOU_HAVE_COUPON?')}</p>
      <input
        className={style.coupon__input}
        placeholder={t('COUPON_PLACEHOLDER')}
        onChange={handleChange}
      ></input>
      <span className={style.coupon__button}>
        <PackageButton type={'couponBtn'} onClick={handleClick} />
      </span>
    </div>
  )
}

export default Coupon
