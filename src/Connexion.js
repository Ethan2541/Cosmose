import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";

import axios from 'axios';

import "./styles/connexion.css";
import "./styles/connexion-inscription.css";
import "./styles/fonts.css";

function Connexion(props) {
    const [login, setLogin] = useState();
    const [password, setPassword] = useState();
    const [passwordMask, setPasswordMask] = useState(true);

    axios.defaults.baseURL = 'http://localhost:8080';

    function gestionLogin(evt) {
        setLogin(evt.target.value);
    }

    function gestionMdp(evt) {
        setPassword(evt.target.value);
    }

    function gestionIconeMdp(evt) {
        setPasswordMask(!passwordMask);
    }

    function idInvalide() {
        alert("Identifiant et/ou mot de passe incorrect(s)");
    }

	function Connexion(evt) {
		evt.preventDefault();
		axios.post('/connexion', {
            login: login,
            password: password
        })
        .then((rep) => {
            rep.data.connect ? props.connexion() : idInvalide();
       })
        .catch((err) => {
            console.log(err);
        })
    }

    return(
        <main id="main-connexion" className="main-connexion-inscription">
            <h2 className="h2-connexion">S'identifier</h2>
            <form id="form-connexion" onSubmit={Connexion}>
                <input type="text" id="login" name="login" placeholder="Identifiant" onChange={(evt) => gestionLogin(evt)}></input>
                <input type={passwordMask ? "password" : "text"} id="password" name="password" placeholder="Mot de passe" onChange={(evt) => gestionMdp(evt)}></input><i onClick={(evt) => gestionIconeMdp(evt)}>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                <button type="submit">Se connecter</button>
            </form>
        </main>
    );
}

export default Connexion;
