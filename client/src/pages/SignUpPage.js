import axios from '../axios.js';
import OfflineHeader from '../components/OfflineHeader.js';

import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/common-loginpage-signuppage.css';
import './styles/signuppage.css';

function SignUpPage(props) {
    // States
    const [userData, setUserData] = useState({ login: '', firstName: '', lastName: '', password: '', password2: ''})
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMask, setPasswordMask] = useState(true);
    const [passwordMask2, setPasswordMask2] = useState(true);

    const navigate = useNavigate();


    // Useful functions
    function handleFirstNameChange(evt) {
        let updatedUserData = userData;
        updatedUserData.firstName = evt.target.value;
        setUserData(updatedUserData);
    }

    function handleLastNameChange(evt) {
        let updatedUserData = userData;
        updatedUserData.lastName = evt.target.value;
        setUserData(updatedUserData);
    }

    function handleLoginChange(evt) {
        let updatedUserData = userData;
        updatedUserData.login = evt.target.value;
        setUserData(updatedUserData);
    }

    function handlePasswordChange(evt) {
        let updatedUserData = userData;
        updatedUserData.password = evt.target.value;
        setPassword(evt.target.value)
        setUserData(updatedUserData);   
    }

    function handlePasswordMask(evt) {
        setPasswordMask(!passwordMask);
    }

    function handlePassword2Change(evt) {
        let updatedUserData = userData;
        updatedUserData.password2 = evt.target.value;
        setPassword2(evt.target.value);
        setUserData(updatedUserData);
    }

    function handlePasswordMask2(evt) {
        setPasswordMask2(!passwordMask2);
    }

    function signup(evt) {
        evt.preventDefault();
        if (password !== password2) {
            axios.post('/api/signup', {
                login: userData.login,
                firstName: userData.firstName,
                lastName: userData.lastName,
                password: userData.password,
                password2: userData.password2
            })
                .then((res) => {
                    document.getElementById('signuppage-invalid').style.setProperty('visibility', 'hidden');
                    navigate('/connexion');
                })
                .catch((err) => {
                    document.getElementById('signuppage-invalid').style.setProperty('visibility', 'visible');
                    console.log('Could not sign up');
                });
        }
        else {
            document.getElementById('signuppage-invalid').style.setProperty('visibility', 'visible');
        }
    }


    // Show if the passwords are different
    useEffect(() => {
        if (password === password2) {
            document.getElementById('password2').classList.remove('input-invalid-password');
        }
        else {
            document.getElementById('password2').classList.add('input-invalid-password');
        }
    }, [password, password2]);

    
    return (
        <div id='signuppage'>
            <header id='signuppage-header'>
                <OfflineHeader currentPage={ 'signuppage' } />
            </header>
            <main id='signuppage-body' className='common-loginpage-signuppage'>
                <h2>S'inscrire</h2>
                <form id='signuppage-form' onSubmit={ signup }>
                    <input type='text' id='firstName' name='firstName' placeholder='Prénom' onChange={ (evt) => handleFirstNameChange(evt) }></input>
                    <input type='text' id='lastName' name='lastName' placeholder='Nom' onChange={ (evt) => handleLastNameChange(evt) }></input>
                    <input className='large-field' type='text' id='login' name='login' placeholder='Identifiant' onChange={ (evt) => handleLoginChange(evt) }></input>
                    <div className='large-field'>
                        <input className='large-field' type={ passwordMask ? 'password' : 'text' } id='password' name='password' placeholder='Mot de passe' onChange={ (evt) => handlePasswordChange(evt) }></input><i onClick={ (evt) => handlePasswordMask(evt) }>{ passwordMask ? <FaEye /> : <FaEyeSlash /> }</i>
                    </div>
                    <div className='large-field'>
                        <input className='large-field' type={ passwordMask2 ? 'password' : 'text' } id='password2' name='password2' placeholder='Retapez le mot de passe' onChange={ (evt) => handlePassword2Change(evt) }></input><i onClick={ (evt) => handlePasswordMask2(evt) }>{ passwordMask2 ? <FaEye /> : <FaEyeSlash /> }</i>
                    </div>
                    <button className='large-field' type='submit'>Enregistrer</button>
                </form>
                <p id='signuppage-invalid' className='common-loginpage-signuppage-invalid'>Informations invalides</p>
            </main>
        </div>
    );
}

export default SignUpPage;