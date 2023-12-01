import DOMPurify from 'dompurify'
import classNames from 'classnames'
import { FC, useState } from 'react'
import { changeMode } from '@utils/changeMode'
import style from './ChangeMode.module.scss'
import { useTranslation } from '@utils/useTranslation'
import { Tabs } from '@pages/lessons'
interface ModeProps {
  index: 1 | 2 | 3
  name: string
  time: string
  desc: string
  bigDesc: string
}

interface ChangeModeProps {
  learnMode: 1 | 2 | 3
  userCourseId: string
  token?: string
  setTab: (tab: Tabs) => void
}

const ChangeMode: FC<ChangeModeProps> = ({
  learnMode,
  userCourseId,
  token,
  setTab,
}) => {
  const { t } = useTranslation()
  const [selected, setSelected] = useState(learnMode)

  const Mode = ({ index, name, time, desc, bigDesc }: ModeProps) => {
    const sanitizedHTML = DOMPurify.sanitize(bigDesc)
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div
        key={index}
        className={classNames(
          style.wrapper,
          style[index === selected ? 'true' : ''],
        )}
      >
        <div className={style.header}>
          {index === selected && (
            <div className={style.yourChoice}>
              {t('LEARNING_MODE_YOUR_CHOICE')}
            </div>
          )}
          <div className={style.modeName}>{name}</div>
          <div className={style.time}>{time}</div>
          <div className={style.dots}>
            <div className={style.purpleDot}></div>
            <div className={index > 1 ? style.purpleDot : style.greyDot}></div>
            <div className={index > 2 ? style.purpleDot : style.greyDot}></div>
          </div>
        </div>
        <div>{desc}</div>
        <button className={style.learnMore} onClick={() => setIsOpen(!isOpen)}>
          {isOpen
            ? t('LEARNING_MODE_LEARN_LESS')
            : t('LEARNING_MODE_LEARN_MORE')}
        </button>

        {isOpen && (
          <div
            className={style.desc}
            dangerouslySetInnerHTML={{ __html: sanitizedHTML }}
          />
        )}
        <button
          className={style.button}
          onClick={() => {
            changeMode(userCourseId, index, token)
            setSelected(index)
            selected === index && setTab('course')
          }}
        >
          {selected === index
            ? t('LEARNING_MODE_BTN_CONTINUE')
            : t('LEARNING_MODE_BTN_SELECT')}
        </button>
      </div>
    )
  }

  return (
    <>
      <div className={style.title}>{t('LEARNING_MODE_CHANGE')}</div>
      <Mode
        index={3}
        name={t('LEARNING_MODE_INTENSIVE_LEARNING')}
        time={t('LEARNING_MODE_TIME_3')}
        desc={t('LEARNING_MODE_WHO_DONT_KNOW')}
        bigDesc={t('LEARNING_MODE_DESCRIPTION_3')}
      />
      <Mode
        index={2}
        name={t('LEARNING_MODE_FAST')}
        time={t('LEARNING_MODE_TIME_2')}
        desc={t('LEARNING_MODE_STRENGTHEN')}
        bigDesc={t('LEARNING_MODE_DESCRIPTION_2')}
      />
      <Mode
        index={1}
        name={t('LEARNING_MODE_REACTIVE')}
        time={t('LEARNING_MODE_TIME_1')}
        desc={t('LEARNING_MODE_WHO_WANTS_REPEAT')}
        bigDesc={t('LEARNING_MODE_DESCRIPTION_1')}
      />
    </>
  )
}

export default ChangeMode
