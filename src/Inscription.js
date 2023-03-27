import {useEffect} from "react";
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
    const [password, setPassword] = useState("");
    const [password2, setPassword2] = useState("");
    const [passwordMask, setPasswordMask] = useState(true);
    const [passwordMask2, setPasswordMask2] = useState(true);
    const [idValide, setIdValide] = useState(true);

    axios.defaults.baseURL = 'http://localhost:8080';

    useEffect(() => {
        if (password == password2) {
            document.getElementById("password2").classList.remove("mdp-incorrect");
            setIdValide(true);
        }
        else {
            document.getElementById("password2").classList.add("mdp-incorrect");
            setIdValide(false);
        }
    }, [password, password2]);

    function gestionMdp(evt) {
        setPassword(evt.target.value);    
    }

    function gestionIconeMdp(evt) {
        setPasswordMask(!passwordMask);
    }

    function gestionMdp2(evt) {
        setPassword2(evt.target.value);
    }

    function gestionIconeMdp2(evt) {
        setPasswordMask2(!passwordMask2);
    }

    function Inscription (evt) {
        if (idValide) {
            axios.post('/inscription', {
                nom: nom,
                prenom: prenom,
                login: login,
                password: password
            })
            .then((response) => {
                props.setPage("connexion");
                response.data.created ? alert("Votre compte a été créé avec succès") : alert("Cet identifiant est déjà utilisé");
            })
            .catch((error) => {
                console.log(error);
            })
        }
        else {
            alert("Les mots de passe ne correspondent pas");
        }
    }

    return (
        <main id="main-inscription">
            <h1 className="h1-inscription">S'inscrire</h1>
            <form id="form-inscription" onSubmit={Inscription}>
                <input type="text" id="prenom" name="prenom" placeholder="Prénom" onChange={(evt) => setPrenom(evt.target.value)}></input>
                <input type="text" id="nom" name="nom" placeholder="Nom" onChange={(evt) => setNom(evt.target.value)}></input>
                <input className="large-field" type="text" id="login" name="login" placeholder="Identifiant" onChange={(evt) => setLogin(evt.target.value)}></input>
                <div className="div-inscription large-field">
                    <input className="large-field" type={passwordMask ? "password" : "text"} id="password" name="password" placeholder="Mot de passe" onChange={(evt) => gestionMdp(evt)}></input><i onClick={(evt) => gestionIconeMdp(evt)}>{passwordMask ? <FaEye /> : <FaEyeSlash />}</i>
                </div>
                <div className="div-inscription large-field">
                    <input className="large-field" type={passwordMask2 ? "password" : "text"} id="password2" name="password2" placeholder="Retapez le mot de passe" onChange={(evt) => gestionMdp2(evt)}></input><i onClick={(evt) => gestionIconeMdp2(evt)}>{passwordMask2 ? <FaEye /> : <FaEyeSlash />}</i>
                </div>
                <button className="large-field" type="submit">Enregistrer</button>
            </form>
        </main>
    );
}

export default Inscription;