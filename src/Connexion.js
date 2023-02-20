import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";

import "./styles/connexion.css";
import "./styles/connexion-inscription.css";
import "./styles/fonts.css";

function Connexion(props) {
    const [login_value, setLogin_value] = useState();
    const [password_value, setPassword_value] = useState();

    return(
        <main id="main-connexion">
            <h1 className="h1-connexion">S'identifier</h1>
            <form id="form-connexion" method="POST">
                <input type="text" id="login" name="login" placeholder="Pseudo"></input>
                <input type="password" id="mdp" name="mdp" placeholder="Mot de passe"></input><i><FaEye /></i>
                <button onClick={props.login}>Se connecter</button>
            </form>
        </main>
    );
}

export default Connexion;