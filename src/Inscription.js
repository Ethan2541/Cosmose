import {useState} from 'react';
import './styles/fonts.css';
import './styles/inscription.css';

function Inscription(props) {
    const [prenom, setPrenom] = useState();
    const [nom, setNom] = useState();
    const [login, setLogin] = useState();
    const [mdp, setMdp] = useState();
    const [mdpbis, setMdpbis] = useState();

    return (
        <main className='main'>
            <h1>S'inscrire</h1>
            <form className="form">
                <input type="text" id="prenom" name="prenom" placeholder="Prénom" onChange={(evnt) => setPrenom(evnt.target.value)}></input>
                <input type="text" id="nom" name="nom" placeholder="Nom" onChange={(evnt) => setNom(evnt.target.value)}></input>
                <input className="large-field" type="text" id="login" name="login" placeholder="Pseudo" onChange={(evnt) => setLogin(evnt.target.value)}></input>
                <div className="large-field">
                    <input className="large-field" type="password" id="mdp" name="mdp" placeholder="Mot de passe" onChange={(evnt) => setMdp(evnt.target.value)}></input>
                </div>
                <div className="large-field">
                    <input className="large-field" type="password" id="mdpbis" name="mdpbis" placeholder="Retapez le mot de passe" onChange={(evnt) => setMdpbis(evnt.target.value)}></input>
                </div>
                <button class="large-field" type="submit">Enregistrer</button>
            </form>
        </main>
    );
}

export default Inscription;