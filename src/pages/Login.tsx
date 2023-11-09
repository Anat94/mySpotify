import React, {useCallback, useState} from 'react'
import LogoSpotify from '../assets/logoSpotify.png'
import './Login.css'
import { FcGoogle } from "react-icons/fc";
import { BsFacebook, BsApple, BsFillEyeSlashFill, BsFillEyeFill } from "react-icons/bs";
import { SocialIcon } from 'react-social-icons'
import {PiWarningCircleBold} from "react-icons/pi"
import Switch from "react-switch";

const Login = () => {
    return (
        <div className='loginPageContainer'>
            <Banner />
            <div className='loginBody'>
                <ConnectionModal />
            </div>
        </div>
    )
}

const Banner = () => {
    return (
        <div className='loginHeaderBanner'>
            <div className='loginLogoContainer'>
                <img className='loginLogoContent' src={LogoSpotify} alt="" />
            </div>
        </div>
    )
};

const ConnectionModal = () => {
    const [error, setError] = useState({
        status: null,
        message: null,
    });

    return (
        <div className='loginModalContainer'>
            <h1 className='loginModalTitle'>J'ai un compte Spotify</h1>
            {error.message != null &&
                <div className="loginModalErrorContainer">
                    <PiWarningCircleBold size={25}/> <p>{error.message} {error.status && error.status}</p>
                </div>
            }
            <div className="loginModalConnectWithContainer">
                <ConnectWith name="Google"/>
                <ConnectWith name="Facebook"/>
                <ConnectWith name="Apple"/>
            </div>
            <hr className='loginModalHr'/>
            <ConnectTo error={error} setError={setError} />
            <hr className='loginModalHr'/>
        </div>
    )
};

const ConnectWith: React.FC<{ name: string }> = ({name}) => {
    return (
        <div className='loginModalConnectWith'>
            {name === "Google" && <FcGoogle  className="logoModalConnectWithIcon"/>}
            {name === "Facebook" && <SocialIcon network="facebook" className="logoModalConnectWithIcon"/>}
            {name === "Apple" && <BsApple className="logoModalConnectWithIcon"/>}
            <div className="logalModalConnectWithTitle">
                Continuer avec {name}
            </div>
        </div>
    )
}

type error = {
    status: Number | null,
    message: string | null,
}
const ConnectTo:  React.FC<{ error: error, setError: Function}>= ({error, setError}) => {
    const [visible, setVisible] = useState(true);
    const [isChecked, setIsChecked] = useState(true);
    const [field, setField] = useState({
        email: '',
        password: ''
    });

    const onCheckChanged = () => {
        setIsChecked(!isChecked);
    }

    const onClickToConnect = useCallback(() => {
        if (!field.email) {
            setError({message:"Veuillez saisir votre nom d'utilisateur Spotify ou votre adresse e-mail."})
        } else if (!field.password) {
            console.log("cc12");
            setError({message:"Entrez votre mot de passe."})
        }
        //make request to connect
    }, [field, setError]);
    return (
        <div className='loginModalConnectToContainer'>
            <div className='loginModalConnectToContainerInputs'>
                <p className='loginModalConnectToContainerInputsTitle'>Adresse e-mail ou nom d'utilisateur</p>
                <input type="text" className='loginModalConnectToContainerInput' placeholder="Adresse e-mail ou nom d'utilisateur" onChange={event => setField({email: event.target.value, password: field.password})}/>
                <p className='loginModalConnectToContainerInputsTitle'>Mot de passe </p>
                <input type={!visible ? "text" : "password"} className='loginModalConnectToContainerInput' placeholder='Mot de passe' onChange={event => setField({email: field.email, password: event.target.value})}/>
                {
                    visible ?
                            <BsFillEyeSlashFill className='loginModalConnectToContainerInputEyesIcon' size={30} onClick={() => setVisible(!visible)}/>
                        :
                            <BsFillEyeFill  className='loginModalConnectToContainerInputEyesIcon' size={30} onClick={() => setVisible(!visible)}/>
                }
            </div>
            <div className='loginModalConnectToContainerRememberMe'>
                <Switch
                    onChange={onCheckChanged}
                    checked={isChecked}
                    onColor="#1ed760"
                    onHandleColor="#000"
                    handleDiameter={15}
                    uncheckedIcon={false}
                    checkedIcon={false}
                    height={20}
                    width={48}
                />
                Se souvenir de moi
            </div>
            <div className='loginModalConnectToButtonConnect' onClick={onClickToConnect}>
                Se Connecter
            </div>
            <p className='loginModalConnectToForgetPassword'><span className='loginModalConnectToForgetPasswordOnClick'>Mot de passe oublié ?</span></p>
            <p className='loginModalConnectToNoAccount'>Vous n'avez pas de compte ? <span className='loginModalConnectToForgetPasswordOnClick'>Je n'ai pas Spotify</span></p>
        </div>
    )
};

export default Login