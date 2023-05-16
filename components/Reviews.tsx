import { range } from 'lodash'
import style from './Reviews.module.scss'
import { FC, useEffect, useState } from 'react'
import { Carousel } from 'react-responsive-carousel'
import { useTranslation } from '@utils/useTranslation'
import { getReviews, ReviewData } from '@utils/getReviews'
import 'react-responsive-carousel/lib/styles/carousel.min.css'

interface CarouselProps {
  review: ReviewData
}

const Review: FC<CarouselProps> = ({ review }) => {
  return (
    <div className={style.review}>
      <div className={style.stars}>
        {range(review.rating).map(item => (
          <span key={item} className={style.star} />
        ))}
      </div>
      <div className={style.quote}>
        <span className={style.quoteMarkTop} />
        <div className={style.text}>{review.review}</div>
        <span className={style.quoteMarkBot} />
      </div>
      <div className={style.user}>
        <div className={style.avatarContainer}>
          <img className={style.avatar} src={review.avatarURL} />
        </div>
        <div className={style.userName}>{review.userName}</div>
      </div>
    </div>
  )
}

export const Reviews: FC = () => {
  const { t } = useTranslation()
  const [reviewsData, setReviewsData] = useState<ReviewData[]>()

  useEffect(() => {
    getReviews().then(response => {
      setReviewsData(response)
    })
  }, [])

  return (
    <div className={style.container}>
      <div className={style.carousel}>
        {reviewsData && (
          <Carousel
            showStatus={false}
            autoPlay
            infiniteLoop
            showThumbs={false}
            showIndicators={false}
          >
            {reviewsData.map(review => (
              <Review key={review._id} review={review} />
            ))}
          </Carousel>
        )}
      </div>
      <a
        href="https://www.facebook.com/lingwingcom/reviews"
        className={style.label}
      >
        {t('reviewsLabel')}
      </a>
    </div>
  )
}
