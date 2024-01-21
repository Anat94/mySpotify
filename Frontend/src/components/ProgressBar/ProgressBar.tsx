import React from 'react'
import styles from './ProgressBar.module.css'

const ProgessBar = ({status, width}: {status: Number, width?: Number}) => {
    return (
        <div className={styles.ProgessBarContainer} style={{width: width ? `${width}%` : "100%"}}>
            <div className={styles.ProgessBarContent}>
                <div className={styles.ProgessBarSucess} style={{width: `${status}%`}}></div>
            </div>
        </div>
    )
}

export default ProgessBar