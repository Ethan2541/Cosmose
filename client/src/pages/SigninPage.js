import axios from 'axios';
import OfflineHeader from '../components/OfflineHeader.js';

import { FaEye } from 'react-icons/fa';
import { FaEyeSlash } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './styles/common-loginpage-signinpage.css';
import './styles/signinpage.css';

function SigninPage(props) {
    const [userData, setUserData] = useState({ login: '', firstName: '', lastName: '', password: '', password2: ''})
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [passwordMask, setPasswordMask] = useState(true);
    const [passwordMask2, setPasswordMask2] = useState(true);

    const navigate = useNavigate();

    axios.defaults.baseURL = 'http://localhost:3001';

    useEffect(() => {
        if (password === password2) {
            document.getElementById('password2').classList.remove('input-invalid-password');
        }
        else {
            document.getElementById('password2').classList.add('input-invalid-password');
        }
    }, [password, password2]);

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

    function signin(evt) {
        evt.preventDefault();
        axios.put('/api/signin', {
            login: userData.login,
            firstName: userData.firstName,
            lastName: userData.lastName,
            password: userData.password
        })
        .then((res) => {
            navigate('/connexion');
        })
        .catch((err) => { console.log(err) });
    }

    return (
        <div id='signinpage'>
            <header id='signinpage-header'>
                <OfflineHeader currentPage={ 'signinpage' } />
            </header>
            <main id='signinpage-body' className='common-loginpage-signinpage'>
                <h2>S'inscrire</h2>
                <form id='signinpage-form' onSubmit={ signin }>
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
            </main>
        </div>
    );
}

export default SigninPage;