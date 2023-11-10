import React , {useState, useCallback} from 'react'
import styles from './Signup.module.css'
import Input from '../../components/Input/Input'
import ConnectWith from '../../components/ConnectWith/ConnectWith'
import { Link } from 'react-router-dom'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useNavigate } from "react-router-dom";

type IUser = {
    status?: string | null,
    message: string | null
}

type tField= {
    email: string,
    password: string,
}

const Signup = ({field, setField} : {field: tField, setField: Function}) => {
    const navigate = useNavigate();

    const [error, setError] = useState<IUser>({
        status: null,
        message: null,
    });

    const onClickToConnect = useCallback(() => {
        if (!field.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(field.email)) {
            setError({message:"Cette adresse e-mail est non valide. Assurez-vous qu'elle respecte ce format : exemple@email.com"})
            return;
        }
        return navigate("/signup/step-1")
        //make request to connect
    }, [field, setError, navigate]);

    return (
        <div className={styles.signUpPageContainer}>
            <div className={styles.signUpPageTitle}>Inscrivez-vous pour commencer à écouter</div>
            <div className={styles.signUpPageConnectionContainer}>
                <Input title={"Adresse e-mail"}  onChange={(val : string) => setField({email: val})} placeholder={'nom@domaine.com'} />
                {
                    error.message != null &&
                        <div className={styles.signUpError}>
                            <PiWarningCircleBold size={50}/>{error.message} {error.status && error.status}
                        </div>
                }
                <div className={styles.signUpButtonConnect} onClick={onClickToConnect}>
                    Se Connecter
                </div>
            </div>
            <hr className={styles.signUpModalHr}/>
            <div className={styles.signUpPageConnectWithContainer}>
                <ConnectWith name={"Google"}  width={90} marginLeft={3}/>
                <ConnectWith name={"Facebook"} width={90} marginLeft={3}/>
            </div>
            <hr className={styles.signUpModalHr}/>
            <div className={styles.signUpToNoAccount}>
                Vous avez déjà un compte ? <Link to={"/signin"} className={styles.signUpToNoAccountClick} onClick={onClickToConnect}>Connectez-vous ici.</Link>
            </div>
        </div>
    )
}

export default Signup