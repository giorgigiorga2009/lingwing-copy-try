import { FC } from "react";
import style from "./NetworkButtons.module.scss"
import classnames from 'classnames'
import { useIntl } from "react-intl";

const LOGIN_NETWORKS = ["facebook", "google", "twitter"] as const

type LoginNetwork = typeof LOGIN_NETWORKS[number]

interface ButtonProps {
    label: LoginNetwork
    isSignInTab: boolean
}

const Button: FC<ButtonProps> = ({ label, isSignInTab }) => {

    const intl = useIntl()
    // const signWith = intl.formatMessage({ id: "AUTH_LOGIN" })

    return (
        <div className={classnames(style.button, style[label])}>
            <div className={classnames(style.icon)} />
            <div className={style.text}>
                 Sign {isSignInTab ? 'in' : 'up'} with{' '} {/* не ясно что делать с этим  */}
                <span className={style.network}>{label}</span>
            </div>
        </div>
    )
}

interface Props {
    isSignInTab: boolean
}

export const NetworkButtons: FC<Props> = ({ isSignInTab }) => {
    return (
        <div className={style.container}>
            {LOGIN_NETWORKS.map(network => (
                <Button key={network} isSignInTab={isSignInTab} label={network} />
            )
            )}
        </div>
    )
}

