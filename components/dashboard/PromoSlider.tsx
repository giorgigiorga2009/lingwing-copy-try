import { FC, useState, useEffect } from 'react'
import style from './PromoSlider.module.scss'
import classNames from 'classnames'

interface CarouselProps {
  images: string[]
}

const PromoSlider: FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0)
  const slides = [
    {
      background: 'orange',
      title: (
        <h6>
          Get the <span>10 Lari</span> homeworks free!
        </h6>
      ),
      button: 'Get Tasks',
    },
    {
      background: 'orange',
      title: (
        <h6>
          Learn <span>5 times</span> faster!
        </h6>
      ),
      button: 'Become a premium',
    },

    {
      background: 'dark',
      title: <h6>A joint project of Liberty and Lingwing</h6>,
      button: 'Learn Georgian',
    },
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex =>
        prevIndex === slides.length - 1 ? 0 : prevIndex + 1,
      )
    }, 7000)
    return () => clearInterval(interval)
  }, [slides.length])

  return (
    <div className={style.promo_slider}>
      {slides.map((slide, index) => (
        <div
          className={classNames(
            style.slide,
            index === activeIndex ? style.slide_active : '',
            index === 2 ? style.slide_dark : style.slide_orange,
          )}
          key={slide.button}
        >
          {slide.title}
          <button>
            {index == 1 ? (
              <img
                src={'/themes/images/v2/banner-link-star.png'}
                alt="Premium star icon"
              />
            ) : null}
            {slide.button}
          </button>
          {index !== 2 ? <div className={style.right}></div> : null}
          {index === 1 ? <div className={style.left}></div> : null}
          {index === 0 ? <div className={style.left_get_tasks}></div> : null}
        </div>
      ))}
    </div>
  )
}

export default PromoSlider
