import { FC, FunctionComponent, ReactNode } from "react"

interface Props {
    children: ReactNode
}

const Layout: FC<Props> = ({ children } ) => {
    return (
        <div>
            {children}
            DETI
        </div>
    )
}

export default Layout