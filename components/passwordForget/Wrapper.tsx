import { PageHead } from '@components/PageHead'
import style from './wrapper.module.scss'
import { Header } from '@components/header/Header'
import { Footer } from '@components/wizard/Footer'
import { FollowButtons } from '@components/home/FollowButtons'

const ContainerWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={style.container}>
      <PageHead text="APP_DASHBOARD" />
      <Header size="s" />
      <div className={style.window}>{children}</div>
      <Footer />
      <FollowButtons dashboard={true} />
    </div>
  )
}

export default ContainerWrapper
