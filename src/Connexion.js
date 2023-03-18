import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import axios from 'axios';

import "./styles/connexion.css";
import "./styles/connexion-inscription.css";
import "./styles/fonts.css";

function Connexion(props) {
    const [loginVal, setLoginVal] = useState();
    const [passwordVal, setPasswordVal] = useState();
    const [passwordMask, setPasswordMask] = useState(true);
	const [correct, setCorrect] = useState(true);

    function gestionIconeMdp (evt) {
        setPasswordMask(!passwordMask);
    }

	axios.defaults.baseURL = 'http://localhost:8080';

	function Connect(evt) {
		evt.preventDefault();
		axios.post('/connexion', {
            login: loginVal,
            password: passwordVal
        })
        .then((response) => {
            response.data.connect ? props.connexion() : setCorrect(false);
       })
        .catch((error) => {
            console.log(error);
        })
    }

    return(
        <main id="main-connexion">
            <h1 className="h1-connexion">S'identifier</h1>
            <form id="form-connexion" onSubmit={Connect}>
                <input type="text" id="login" name="login" placeholder="Pseudo" onChange={(evt) => {setLoginVal(evt.target.value)}}></input>
                <input type={passwordMask ? "password" : "text"} id="mdp" name="mdp" placeholder="Mot de passe" onChange={(evt) => {setPasswordVal(evt.target.value)}}></input><i onClick={(evt) => gestionIconeMdp(evt)}>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                <button type="submit">Se connecter</button>
            </form>
			{correct === false && <p>Mot de passe ou login incorrect</p>}
        </main>
    );
}

export default Connexion;
