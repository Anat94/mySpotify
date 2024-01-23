import React, {useCallback} from 'react'
import styles from "./SignupTermOfUse.module.css"
import StepToConnect from "../../components/StepToConnect/StepToConnect"
import { tField } from '../../Types';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

const SignupTermOfUse = ({field, setField}: {field: tField, setField: Function}) => {

    const navigate = useNavigate();
    const onClickToConnect = useCallback(() => {
        axios.post("http://127.0.0.1:8000/signup", {
            "email": field.email,
            "password": field.password,
            "name": field.name,
            "birth_date": field.birthday,
            "gender": field.gender,
        }).then((response) => {
            navigate("/");
        }).catch((error) => {
            console.log(error);
        });
    }, [navigate, field]);

  return (
    <div className={styles.SignupTermOfUse}>
        <StepToConnect step={3} title={"Conditions d'utilisation"} progress={100} goBack={"/signup/step-2"}/>
        <label className={styles.SignupTermOfUseContent} style={{marginTop: "10%"}}>
            <input
                className={styles.SignupTermOfUseContentInput}
                type="checkbox"
                name="radioGroup"
                value={"J'accepte de recevoir des actualités et des offres de Spotify"}
            />
            <p className={styles.SignupTermOfUseContentLabel}>
                J'accepte de recevoir des actualités et des offres de Spotify
            </p>
        </label>
        <label className={styles.SignupTermOfUseContent} style={{marginTop: "2%"}}>
            <input
                className={styles.SignupTermOfUseContentInput}
                type="checkbox"
                name="radioGroup"
                value={"Partagez les données sur mon inscription avec les fournisseurs de contenu de Spotify à des fins de marketing. Notez que vos données peuvent être transférées vers des pays en dehors de l'Espace économique européen, comme précisé dans notre Politique de confidentialité."}
            />
            <p className={styles.SignupTermOfUseContentLabel}>
                Partagez les données sur mon inscription avec les fournisseurs de contenu de Spotify à des fins de marketing. Notez que vos données peuvent être transférées vers des pays en dehors de l'Espace économique européen, comme précisé dans notre Politique de confidentialité.
            </p>
        </label>
        <p className={styles.SignupTermOfUseContentBottom}>
            En cliquant sur le bouton d'inscription, vous acceptez les <span className={styles.SignupTermOfUseContentBottomOnclick}>Conditions générales d'utilisation de Spotify.</span>
        </p>
        <p className={styles.SignupTermOfUseContentBottom}>
            Pour en savoir plus sur la façon dont Spotify recueille, utilise, partage et protège vos données personnelles, veuillez consulter la <span className={styles.SignupTermOfUseContentBottomOnclick}>Politique de confidentialité de Spotify.</span>
        </p>
        <div className={styles.signUpButtonConnect} onClick={onClickToConnect}>
            S'inscrire
        </div>
    </div>
  )
}

export default SignupTermOfUse