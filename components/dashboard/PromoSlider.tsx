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
      background: '#f28e13',
      title: 'Get the 10 Lari homeworks free!',
      button: 'Get Tasks',
    },
    {
      background: '#f28e13',
      title: 'Get 10 Lari homeworks free!',
      button: 'Become a premium',
    },

    {
      background: 'rgb(16, 24, 32)',
      title: 'A joint project of Liberty and Lingwing',
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
    <div
      className={style.promo_slider}
      style={{ position: 'relative', maxWidth: '800px', margin: '0 auto' }}
    >
      {slides.map((slide, index) => (
        <div
          className={classNames(
            style.slide,
            index === activeIndex ? style.slide_active : '',
          )}
          key={index}
          // style={{
          //   opacity: index === activeIndex ? 1 : 0,
          //   transition: `opacity 1.5s${
          //     index === activeIndex ? '' : ', visibility 0s linear 1.5s'
          //   }`,
          //   visibility: index === activeIndex ? 'visible' : 'hidden',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   right: 0,
          //   bottom: 0,
          //   margin: 'auto',
          //   maxHeight: '400px',
          //   maxWidth: '100%',
          // }}
          style={{ background: `${slide.background}` }}
        ></div>
      ))}
    </div>
  )
}

export default PromoSlider
