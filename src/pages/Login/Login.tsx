import React, {useCallback, useState} from 'react'
import './Login.css'
import {PiWarningCircleBold} from "react-icons/pi"
import Switch from "react-switch";
import {Link} from "react-router-dom";
import HeaderBar from '../../components/HeaderBar/HeaderBar';
import ConnectWith from '../../components/ConnectWith/ConnectWith';
import Input from '../../components/Input/Input';

const Login = () => {
    return (
        <div className='loginPageContainer'>
            <HeaderBar />
            <div className='loginBody'>
                <ConnectionModal />
            </div>
        </div>
    )
}

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
                <ConnectWith name="Google" width={40}/>
                <ConnectWith name="Facebook" width={40}/>
                <ConnectWith name="Apple" width={40}/>
            </div>
            <hr className='loginModalHr'/>
            <ConnectTo error={error} setError={setError} />
            <hr className='loginModalHr'/>
        </div>
    )
};

type error = {
    status: Number | null,
    message: string | null,
}

const ConnectTo = ({error, setError}: {error: error, setError: Function}) => {
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
                <Input title={"Adresse e-mail ou nom d'utilisateur"} placeholder={"Adresse e-mail ou nom d'utilisateur"} onChange={setField} width={45} marginLeft={28}/>
                <Input title={"Mot de passe"} placeholder={"Mot de passe"} onChange={setField} width={45} marginLeft={28} eyes={true}/>
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
            <p className='loginModalConnectToNoAccount'>Vous n'avez pas de compte ? <Link className='loginModalConnectToForgetPasswordOnClick' to={"/signup"}>Je n'ai pas Spotify</Link></p>
        </div>
    )
};

export default Login