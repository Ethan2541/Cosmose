import axios from 'axios';
import OfflineHeader from "../components/OfflineHeader.js";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import "./styles/loginpage.css";
import "./styles/common-loginpage-signinpage.css";

function LoginPage(props) {
    const [userData, setUserData] = useState({ login: "", password: "" });
    const [passwordMask, setPasswordMask] = useState(true);

    const navigate = useNavigate();
    axios.defaults.baseURL = 'http://localhost:8080';

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

	function handleLogin(evt) {
		evt.preventDefault();
		axios.post("/api/login", {
            login: userData.login,
            password: userData.password
        })
            .then((res) => {
                window.localStorage.setItem("token", res.data.accessToken);

                axios.get(`/users/${userData.login}`, { login: userData.login })
                    .then((res) => {
                        const newUser = res.data.user;
                        props.setUser(newUser);
                        window.localStorage.setItem("user", JSON.stringify(newUser));
                        navigate("/accueil");
                    })
            })
            .catch((err) => console.log(err));
    }

    return(
        <div id="loginpage">
            <div id="loginpage-header">
                <OfflineHeader currentPage={ "loginpage" }/>
            </div>
            <div id="loginpage-body" className="common-loginpage-signinpage">
                <h2>S'identifier</h2>
                <form id="loginpage-form" onSubmit={ handleLogin }>
                    <input type="text" id="login" name="login" placeholder="Identifiant" onChange={ (evt) => handleLoginChange(evt) }></input>
                    <input type={passwordMask ? "password" : "text"} id="password" name="password" placeholder="Mot de passe" onChange={ (evt) => handlePasswordChange(evt) }></input><i onClick={ (evt) => handlePasswordMask(evt) }>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
