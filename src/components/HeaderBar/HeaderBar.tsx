import React from 'react'
import LogoSpotify from '../../assets/logoSpotify.png'
import styles from './HeaderBar.module.css';

const HeaderBar = () => {
    return (
        <div className={styles.loginHeaderBanner}>
            <div className={styles.loginLogoContainer}>
                <img className={styles.loginLogoContent} src={LogoSpotify} alt="" />
            </div>
        </div>
    )
}

export default HeaderBar