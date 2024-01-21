import React from "react";
import ProgressBar from "../ProgressBar/ProgressBar";
import { IoIosArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import styles from "./StepToConnect.module.css";

const StepToConnect = ({step, title, progress, goBack}: {step: Number, title: string, progress: Number, goBack: string}) => {

    return (
        <div className={styles.SignupCreatePassword}>
            <ProgressBar status={progress} width={100}/>
            <div className={styles.SignupCreatePasswordTitle}>
            <Link to={goBack} ><IoIosArrowBack size={30} color={"#727272"} /> </Link>
                <div className={styles.SignupCreatePasswordDesc}>
                    <p className={styles.SignupCreatePasswordSteps}>Étape {`${step}`} sur 3</p>
                    <p className={styles.SignupCreatePasswordStepsTitle}>{title}</p>
                </div>
            </div>
        </div>
    )
}

export default StepToConnect