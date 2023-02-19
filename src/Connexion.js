import {useState} from 'react';
import "./styles/connexion-inscription.css";
import './styles/fonts.css';

function Connexion(props) {
    const [login_value, setLogin_value] = useState();
    const [password_value, setPassword_value] = useState();

    return(
        <main>
            <h1>S'identifier</h1>
            <form className="form">
                <input type="text" id="login" name="login" placeholder="Pseudo"></input>
                <input type="password" id="mdp" name="mdp" placeholder="Mot de passe"></input><i className="fa-regular fa-eye"></i>
                <button onClick={props.login}>Se connecter</button>
            </form>
        </main>
    );
}

export default Connexion;