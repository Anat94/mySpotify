import React, { useState, useCallback, useEffect } from 'react'
import StepToConnect from '../../components/StepToConnect/StepToConnect'
import styles from './SignupInformations.module.css'
import Input from '../../components/Input/Input'
import { PiWarningCircleBold } from 'react-icons/pi'
import { useNavigate } from "react-router-dom";
import { tField } from '../../Types';

const chooseGenre = [
  {
    id: 1,
    name: "Homme"
  },
  {
    id: 2,
    name: "Femme"
  },
  {
    id: 3,
    name: "Non binaire"
  },
  {
    id: 4,
    name: "Autre"
  },
  {
    id: 5,
    name: "Je ne souhaite pas l'indiquer"
  }
]

const SignupInformations = ({field, setField}: {field: tField, setField: Function}) => {

  const navigate = useNavigate();
  const [errorName, setErrorName] = useState("")
  const [errorBirthday, setErrorBirthday] = useState("")
  const [errorGender, setErrorGender] = useState("")

  const onClickToConnect = useCallback(() => {
    setErrorBirthday("")
    setErrorName("")
    setErrorGender("")
    if (!field.name) {
      setErrorName("Saisissez un nom pour votre profil.")
    }
    if (field.birthday.length < 3) {
      setErrorBirthday("Veuillez saisir votre date de naissance.")
    }
    if (!field.gender) {
      setErrorGender('Sélectionnez votre sexe.')
    }
    (field.name && field.birthday.length > 2 && field.gender) ? navigate("/signup/step-3") : setField((prev: tField) => ({...prev, name:field.name, birthday: field.birthday, gender: field.gender}))
  }, [navigate, setField, field]);

  return (
    <div className={styles.SignupGetInformations}>
        <StepToConnect step={2} title={"Parlez-nous de vous"} progress={66.66} goBack={"/signup/step-1"}/>
        <div style={{marginTop: "5%"}}>
            <Input title={"Nom"} subtitle={'Ce nom apparaîtra sur votre profil'} onChange={(val : string) => setField((prev: tField) => ({...prev, name: val}))} width={80} marginLeft={10}/>
            {
              errorName.length > 0 &&
              <div className={styles.signUpError}>
                  <PiWarningCircleBold size={30}/>{errorName}
              </div>
            }
            <GetBirthdayDate setBirthdayDate={(val: string) => (setField((prev: tField) => ({...prev, birthday: val})))} errorBirthday={errorBirthday}/>
            <p className={styles.SignupInformationsTitle}>Genre</p>
            <p className={styles.SignupInformationsSubTitle}>Nous utilisons votre genre pour personnaliser nos recommandations de contenu et nos annonces.</p>
            <div className={styles.SignupSelectGenre}>
              {
                chooseGenre.map((genre) => (
                  <label key={genre.id} className={styles.SignupSelectGenreContent}>
                    <input
                      className={styles.SignupSelectGenreContentInput}
                      type="radio"
                      name="radioGroup"
                      value={genre.name}
                      onChange={e => setField((prev: tField) => ({...prev, gender: e.target.value}))}
                    />
                    {genre.name}
                  </label>
                ))
              }
            </div>
              {
                errorGender.length > 0 &&
                <div className={styles.signUpError}>
                    <PiWarningCircleBold size={30}/>{errorGender}
                </div>
              }
            <div className={styles.signUpButtonConnect} onClick={onClickToConnect}>
                Suivant
            </div>
        </div>
    </div>
  )
}



const GetBirthdayDate = ({setBirthdayDate, errorBirthday}: {setBirthdayDate: Function, errorBirthday: string}) => {

  const [day, setDay] = useState("")
  const [month, setMonth] = useState("")
  const [year, setYear] = useState("")
  const onChange = (val: string, type: string) => {
    if (type === "day") {
      setDay(prev => val)
    }
    if (type === "month") {
      setMonth(prev => val)
    }
    if (type === "year") {
      setYear(prev => val)
    }
  }

  useEffect(() => {
    const dateOfBirth = `${day}/${month}/${year}`;
    setBirthdayDate(dateOfBirth);
  }, [day, month, year]);

  return (
    <>
      <p className={styles.SignupInformationsTitle}>Date de naissance</p>
      <p className={styles.SignupInformationsSubTitle}>Pourquoi avons-nous besoin de votre date de naissance ?</p>
      <div className={styles.birthdayDivContainer}>
        <input
          type={"text"}
          className={styles.input}
          style={{width: "20%"}}
          placeholder={"JJ"}
          onChange={(event) => onChange(event.target.value, "day")}
        />
        {/* <input
          type={"text"}
          className={styles.input}
          placeholder={"MM"}
          onChange={(event) => onChange(event.target.value, "month")}
        /> */}
        <select
          className={styles.inputSelect}
          placeholder={'MM'}
          onChange={(event) => onChange(event.target.value, "month")}
        >
          <option value="01">Janvier</option>
          <option value="02">Février</option>
          <option value="03">Mars</option>
          <option value="04">Avril</option>
          <option value="05">Mai</option>
          <option value="06">Juin</option>
          <option value="07">Juillet</option>
          <option value="08">Aout</option>
          <option value="09">Septembre</option>
          <option value="10">Octobre</option>
          <option value="11">Novembre</option>
          <option value="12">Décembre</option>
        </select>
        <input
          type={"text"}
          className={styles.input}
          placeholder={"AAAA"}
          onChange={(event) => onChange(event.target.value, "year")}
        />
      </div>
      {
        errorBirthday &&
        <div className={styles.signUpError}>
            <PiWarningCircleBold size={30}/>Veuillez saisir votre date de naissance.
        </div>
      }
    </>
  )
}


export default SignupInformations