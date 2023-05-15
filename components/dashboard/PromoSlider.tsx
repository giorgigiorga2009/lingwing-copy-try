import { FC } from 'react'
import ReactDOM from 'react-dom'
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import { Carousel } from 'react-responsive-carousel'
import style from './PromoSlider.module.scss'

const PromoSlider: FC = () => {
  return (
    <div className={style.promo_slider}>
      <Carousel>
        <div>
          <p className="legend">Legend 1</p>
        </div>
        <div>
          <p className="legend">Legend 2</p>
        </div>
        <div>
          <p className="legend">Legend 3</p>
        </div>
      </Carousel>
    </div>
  )
}

export default PromoSlider
