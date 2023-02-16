import {useState} from 'react';
import "./style/login.css"

function Login(props){
    const [login_value, setLogin_value] = useState();
    const [password_value, setPassword_value] = useState();

    return(
        <div>
            <h1>S'identifier</h1>
            <div className="form">
                <input type="text" id="login" name="login" placeholder="Pseudo"></input>
                <input type="password" id="mdp" name="mdp" placeholder="Mot de passe"></input><i class="fa-regular fa-eye"></i>
                <button onClick={props.login}>Se connecter</button>
            </div>
        </div>
    );
}

export default Login;