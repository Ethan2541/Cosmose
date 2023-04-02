import axios from 'axios';
import OfflineHeader from "../components/OfflineHeader.js";

import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useState } from "react";

import "./styles/loginpage.css";
import "./styles/common-loginpage-signinpage.css";

function LoginPage(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMask, setPasswordMask] = useState(true);

    const navigate = useNavigate();
    axios.defaults.baseURL = 'http://localhost:8080';

    function handleLogin(evt) {
        setLogin(evt.target.value);
    }

    function handlePassword(evt) {
        setPassword(evt.target.value);
    }

    function handlePasswordMask(evt) {
        setPasswordMask(!passwordMask);
    }

	function handleConnection(evt) {
		evt.preventDefault();
		axios.post("/api/login", {
            "login": login,
            "password": password
        })
        .then((res) => {
            localStorage.setItem("user", res.data.accessToken);
            navigate("../accueil");
        })
        .catch((err) => console.log(err));
    }

    return(
        <div id="loginpage">
            <OfflineHeader currentPage={ "loginpage" }/>
            <div id="loginpage-body" className="common-loginpage-signinpage">
                <h2>S'identifier</h2>
                <form id="loginpage-form" onSubmit={ handleConnection }>
                    <input type="text" id="login" name="login" placeholder="Identifiant" onChange={ (evt) => handleLogin(evt) }></input>
                    <input type={passwordMask ? "password" : "text"} id="password" name="password" placeholder="Mot de passe" onChange={ (evt) => handlePassword(evt) }></input><i onClick={ (evt) => handlePasswordMask(evt) }>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                    <button type="submit">Se connecter</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;
