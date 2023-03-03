import {useState} from "react";
import {FaEye} from "react-icons/fa";
import {FaEyeSlash} from "react-icons/fa";
import axios, {isCancel, AxiosError} from 'axios';

import "./styles/connexion-inscription.css";
import "./styles/fonts.css";
import "./styles/inscription.css";

function Inscription(props) {
    const [prenom, setPrenom] = useState();
    const [nom, setNom] = useState();
    const [login, setLogin] = useState();
    const [mdp, setMdp] = useState();
    const [mdpbis, setMdpbis] = useState();
    const [passwordMask, setPasswordMask] = useState(true);
    const [passwordMaskBis, setPasswordMaskBis] = useState(true);

    axios.defaults.baseURL = 'http://localhost:80';

    function gestionIconeMdp (evt) {
        setPasswordMask(!passwordMask);
    }

    function gestionIconeMdpBis (evt) {
        setPasswordMaskBis(!passwordMaskBis);
    }

    function Submit (evt) {
        if(mdp === mdpbis) alert("Les mots de passes ne correspondent pas");
        else{
            axios.post('/inscription', {
                nom: nom,
                prenom: prenom,
                login: login,
                mdp: mdp
            })
            .then((response) => {
                props.setPage("connexion");
                response.data.created ? alert("utilisateur crée") : alert("utilisateur déjà existant");
            })
            .catch((error) => {
                console.log(error);
            })
        }
    }

    return (
        <main id="main-inscription">
            <h1 className="h1-inscription">S'inscrire</h1>
            <form id="form-inscription" method="POST">
                <input type="text" id="prenom" name="prenom" placeholder="Prénom" onChange={(evt) => setPrenom(evt.target.value)}></input>
                <input type="text" id="nom" name="nom" placeholder="Nom" onChange={(evt) => setNom(evt.target.value)}></input>
                <input className="large-field" type="text" id="login" name="login" placeholder="Pseudo" onChange={(evt) => setLogin(evt.target.value)}></input>
                <div className="div-inscription large-field">
                    <input className="large-field" type={passwordMask ? "password" : "text"} id="mdp" name="mdp" placeholder="Mot de passe" onChange={(evt) => setMdp(evt.target.value)}></input><i onClick={(evt) => gestionIconeMdp(evt)}>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                </div>
                <div className="div-inscription large-field">
                    <input className="large-field" type={passwordMaskBis ? "password" : "text"} id="mdpbis" name="mdpbis" placeholder="Retapez le mot de passe" onChange={(evt) => setMdpbis(evt.target.value)}></input><i onClick={(evt) => gestionIconeMdpBis(evt)}>{passwordMaskBis ? <FaEye /> : <FaEyeSlash />}</i>
                </div>
                <button className="large-field" type="submit" onClick={Submit}>Enregistrer</button>
            </form>
        </main>
    );
}

export default Inscription;