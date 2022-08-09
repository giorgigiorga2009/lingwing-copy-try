import classNames from 'classnames'
import { FC } from 'react'
import Foco from 'react-foco'
import {
  ABOUT_COMPANY_KEYS,
  COURSES_KEYS,
  HELP_KEYS,
  PREMIUM_KEYS,
  SIDE_MENU_LINKS,
} from '../../utils/const'
import { useTranslation } from '../../utils/useTranslation'
import styles from './SideMenu.module.scss'

export type SideMenuKeys = keyof typeof SIDE_MENU_LINKS

interface SectionProps {
  options: SideMenuKeys[]
  title: string
}

const Section: FC<SectionProps> = ({ options, title }) => {
  const { t } = useTranslation()

  return (
    <section>
      <h3>{title}</h3>
      <div className={styles.list}>
        {options.map(element => (
          <a href={SIDE_MENU_LINKS[element]} key={element}>
            {t(element)}
          </a>
        ))}
      </div>
    </section>
  )
}

interface SideMenuProps {
  onClose: () => void
}

export const SideMenu: FC<SideMenuProps> = ({ onClose }) => {
  const { t } = useTranslation()

  return (
    <div className={styles.wrapper}>
      <Foco
        component="div"
        className={styles.container}
        onClickOutside={onClose}
      >
        <div className={styles.button} onClick={onClose} />
        <div className={styles.content}>
          <div className={styles.menu}>
            <Section title={t('APP_FOOTER_COURSES')} options={COURSES_KEYS} />
            <Section title={t('APP_menu-premium')} options={PREMIUM_KEYS} />
            <Section
              title={t('APP_menu-company')}
              options={ABOUT_COMPANY_KEYS}
            />
            <Section title={t('APP_menu-help')} options={HELP_KEYS} />
          </div>

          <div className={styles.footer}>
            <h3 className={styles.title}>{t('APP_DOWNLOAD_APP')}</h3>
            <div className={styles.mobileMarkets}>
              <a
                className={classNames(styles.market, styles.apple)}
                href="https://play.google.com/store/apps/details?id=org.android.lingwing.app"
              />
              <a
                className={classNames(styles.market, styles.google)}
                href="https://apps.apple.com/us/app/lingwing-language-learning/id1217989755"
              />
            </div>
          </div>
        </div>
      </Foco>
    </div>
  )
}
