import {FaChevronCircleLeft} from "react-icons/fa"

import "./styles/entete.css";
import "./styles/fonts.css";

function Entete(props) {
    function connexion_inscription() {
        if (props.pageCourante === "connexion") {
            return (
                <button className="bouton-connexion-inscription" onClick={(evt) => props.setPage("inscription")}>
                    S'INSCRIRE
                </button>
            )
        }
        else if (props.pageCourante === "inscription") {
            return (
                <button className="bouton-connexion-inscription" onClick={(evt) => props.setPage("connexion")}>
                    SE CONNECTER
                </button>
            )
        }
    }
    return (
        <header id="header-offline">
            <h1>COSMOSE</h1>
            <nav>
                <button className="sans-bordure" onClick={(evt) => props.setPage("accueil")}>
                    ACCUEIL
                </button>
                {connexion_inscription()}
            </nav>
        </header>
    )
}

export default Entete;