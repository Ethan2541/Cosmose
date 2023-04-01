import { Link } from "react-router-dom";
import "./styles/welcomepage.css";

function WelcomePage(props) {
    return(
        <div id="welcomepage">
            <div id="welcomepage-body">
                <h1>COSMOSE</h1>
                <Link to="connexion" id="welcomepage-login">Se connecter</Link>
                <Link to="inscription" id="welcomepage-signin">S'inscrire</Link>
                <img id="welcomepage-planet" draggable="false" src="./assets/img/planete.png" alt="Planète"/>
            </div>
        </div>
    );
}

export default WelcomePage;