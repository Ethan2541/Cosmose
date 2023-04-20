import axios from '../axios.js';
import OfflineHeader from '../components/OfflineHeader.js';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './styles/loginpage.css';
import './styles/common-loginpage-signuppage.css';

function LoginPage(props) {
    // States
    const [userData, setUserData] = useState({ login: '', password: '', rememberMe: false });
    const [rememberMe, setRememberMe] = useState(true);
    const [passwordMask, setPasswordMask] = useState(true);
    const navigate = useNavigate();


    // Useful functions
    function handleLoginChange(evt) {
        let updatedUserData = userData;
        updatedUserData.login = evt.target.value;
        setUserData(updatedUserData);
    }

    function handlePasswordChange(evt) {
        let updatedUserData = userData;
        updatedUserData.password = evt.target.value;
        setUserData(updatedUserData);
    }

    function handlePasswordMask(evt) {
        setPasswordMask(!passwordMask);
    }

    function handleRememberMeChange(evt) {
        let updatedUserData = userData;
        setRememberMe(!rememberMe);
        updatedUserData.rememberMe = rememberMe;
        setUserData(updatedUserData);
    }

	function handleLogin(evt) {
		evt.preventDefault();
		axios.post('/api/login', {
            login: userData.login,
            password: userData.password,
            rememberMe: userData.rememberMe
        })
            .then((res) => {
                const token = res.data.accessToken;
                axios.get(`/users/${userData.login}`)
                    .then((res) => {
                        document.getElementById('loginpage-invalid').style.setProperty('visibility', 'hidden');
                        // Store the token
                        if (res.data.user) {
                            window.localStorage.setItem('token', token);
                            window.localStorage.setItem('user', JSON.stringify(res.data.user));
                            props.setCurrentUser(res.data.user);
                            props.setCurrentTheme(res.data.user.theme);
                            navigate('/accueil');
                        }
                    })
                    .catch((err) => {
                        document.getElementById('loginpage-invalid').style.setProperty('visibility', 'visible');
                        console.log('Could not log in');
                    });
            })
            .catch((err) => {
                document.getElementById('loginpage-invalid').style.setProperty('visibility', 'visible');
                console.log('Could not log in');
            });
    }


    return(
        <div id='loginpage'>
            <header id='loginpage-header'>
                <OfflineHeader currentPage={ 'loginpage' }/>
            </header>
            <main id='loginpage-body' className='common-loginpage-signuppage'>
                <h2>S'identifier</h2>
                <form id='loginpage-form' onSubmit={ handleLogin }>
                    <input type='text' id='login' name='login' placeholder='Identifiant' onChange={ (evt) => handleLoginChange(evt) }></input>
                    <input type={passwordMask ? 'password' : 'text'} id='password' name='password' placeholder='Mot de passe' onChange={ (evt) => handlePasswordChange(evt) }></input><i onClick={ (evt) => handlePasswordMask(evt) }>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                    <button type='submit'>Se connecter</button>
                    <div id='loginpage-rememberme'>
                        <input type='checkbox' id='rememberMe' onChange={ (evt) => handleRememberMeChange(evt) }></input>
                        <label htmlFor='checkbox'>Se souvenir de moi</label>
                    </div>
                    <p id='loginpage-invalid' className='common-loginpage-signuppage-invalid'>Identifiants invalides</p>
                </form>
            </main>
        </div>
    );
}

export default LoginPage;
