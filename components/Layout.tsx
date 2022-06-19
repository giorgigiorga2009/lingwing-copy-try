import { FC, FunctionComponent, ReactNode } from "react"
import styles from './Layout.module.scss'

interface Props {
    children: ReactNode
}


const Layout: FC<Props> = ({ children } ) => {
    return (
        <div className={styles.layout}>
            {children}
            DETI
        </div>
    )
}

export default Layout