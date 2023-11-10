import React, {useCallback, useState} from 'react'
import styles from './SignupCreatePassword.module.css'
import Input from '../../components/Input/Input'
import StepToConnect from '../../components/StepToConnect/StepToConnect'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useNavigate } from "react-router-dom";

type tField= {
    email: string,
    password: string,
}

const SignupCreatePassword = ({field, setField}: {field: tField, setField: Function}) => {
    const navigate = useNavigate();
    const [error, setError] = useState("")
    const onClickToConnect = useCallback(() => {
        if (!field.password || field.password.length < 8) {
            setError("Le mot de passe doit comporter au moins 8 caractères.")
            return;
        }
        return navigate("/signup/step-2")
    }, [navigate, field.password]);

    return (
        <div className={styles.SignupCreatePasswordContent}>
            <StepToConnect step={1} title={"Créez un password"} />
            <div style={{marginTop: "5%"}}>
                <Input title={"Mot de passe"} onChange={(val : string) => setField({password: val})} width={80} marginLeft={10} eyes/>
                {
                    error.length > 0 &&
                        <div className={styles.signUpError}>
                            <PiWarningCircleBold size={30}/>{error}
                        </div>
                }
                <p className={styles.SignupCreatePasswordSubtitle}>
                    Le mot de passe doit comporter au moins 8 caractères. Nous recommandons d'inclure au moins un chiffre et un caractère spécial.
                </p>
                <div className={styles.signUpButtonConnect} onClick={onClickToConnect}>
                    Se Connecter
                </div>
            </div>
        </div>
    )
}

export default SignupCreatePassword