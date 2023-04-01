import axios from 'axios';
import OfflineHeader from "../components/OfflineHeader.js";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";

import "./styles/common-loginpage-signinpage.css";
import "./styles/signinpage.css";

function SigninPage(props) {
    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMask, setPasswordMask] = useState(true);
    const [passwordMask2, setPasswordMask2] = useState(true);

    axios.defaults.baseURL = 'http://localhost:8080';

    useEffect(() => {
        if (password == password2) {
            document.getElementById("password2").classList.remove("input-invalid-password");
        }
        else {
            document.getElementById("password2").classList.add("input-invalid-password");
        }
    }, [password, password2]);

    function handlePassword(evt) {
        setPassword(evt.target.value);    
    }

    function handlePasswordMask(evt) {
        setPasswordMask(!passwordMask);
    }

    function handlePassword2(evt) {
        setPassword2(evt.target.value);
    }

    function handlePasswordMask2(evt) {
        setPasswordMask2(!passwordMask2);
    }

    function signin(evt) {
        axios.post('/inscription', {
            name: name,
            surname: surname,
            login: login,
            password: password
        })
        .then((response) => {
            props.setPageCourante("connexion");
            response.data.created ? alert("Votre compte a été créé avec succès") : alert("Cet identifiant est déjà utilisé");
        })
        .catch((error) => {
            console.log(error);
        })
    }

    return (
        <div id="signinpage">
            <OfflineHeader currentPage={ "signin" } />
            <div id="signinpage-body" className="common-loginpage-signinpage">
                <h2>S'inscrire</h2>
                <form id="signinpage-form" onSubmit={ signin }>
                    <input type="text" id="name" name="name" placeholder="Prénom" onChange={ (evt) => setName(evt.target.value) }></input>
                    <input type="text" id="surname" name="surname" placeholder="Nom" onChange={ (evt) => setSurname(evt.target.value) }></input>
                    <input className="large-field" type="text" id="login" name="login" placeholder="Identifiant" onChange={ (evt) => setLogin(evt.target.value) }></input>
                    <div className="large-field">
                        <input className="large-field" type={ passwordMask ? "password" : "text" } id="password" name="password" placeholder="Mot de passe" onChange={ (evt) => handlePassword(evt) }></input><i onClick={ (evt) => handlePasswordMask(evt) }>{ passwordMask ? <FaEye /> : <FaEyeSlash /> }</i>
                    </div>
                    <div className="large-field">
                        <input className="large-field" type={ passwordMask2 ? "password" : "text" } id="password2" name="password2" placeholder="Retapez le mot de passe" onChange={ (evt) => handlePassword2(evt) }></input><i onClick={ (evt) => handlePasswordMask2(evt) }>{ passwordMask2 ? <FaEye /> : <FaEyeSlash /> }</i>
                    </div>
                    <button className="large-field" type="submit">Enregistrer</button>
                </form>
            </div>
        </div>
    );
}

export default SigninPage;