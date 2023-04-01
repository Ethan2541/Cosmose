import { axios } from 'axios';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { useState } from "react";

import "./styles/loginpage.css";
import "./styles/connexion-inscription.css";

function LoginPage(props) {
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [passwordMask, setPasswordMask] = useState(true);

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
		axios.post('/connexion', {
            login: login,
            password: password
        })
        .then((rep) => {
            rep.data.connect && props.toConnect();
       })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <div id="loginpage" className="common-loginpage-signinpage">
            <h2>S'identifier</h2>
            <form id="loginpage-form" onSubmit={props.toConnect}>
                <input type="text" id="login" name="login" placeholder="Identifiant" onChange={ (evt) => handleLogin(evt) }></input>
                <input type={passwordMask ? "password" : "text"} id="password" name="password" placeholder="Mot de passe" onChange={ (evt) => handlePassword(evt) }></input><i onClick={ (evt) => handlePasswordMask(evt) }>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                <button type="submit">Se connecter</button>
            </form>
        </div>
    );
}

export default LoginPage;
