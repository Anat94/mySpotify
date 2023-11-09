import React from 'react'
import { FcGoogle } from "react-icons/fc";
import { BsApple } from "react-icons/bs";
import { SocialIcon } from 'react-social-icons'
import styles from "./ConnectWith.module.css"

const ConnectWith: React.FC<{ name: string, width?: Number, marginLeft?: Number }> = ({name, width = 100, marginLeft = 0}) => {
    return (
        <div className={styles.loginModalConnectWith} style={{ width: width ? `${width}%` : '100%', marginLeft: `${marginLeft}%` }}>
            {name === "Google" && <FcGoogle  className={styles.logoModalConnectWithIcon}/>}
            {name === "Facebook" && <SocialIcon network="facebook" className={styles.logoModalConnectWithIcon}/>}
            {name === "Apple" && <BsApple className={styles.logoModalConnectWithIcon}/>}
            <div className={styles.logalModalConnectWithTitle}>
                Continuer avec {name}
            </div>
        </div>
    )
}

export default ConnectWith