import {FaChevronCircleLeft} from "react-icons/fa"

import "./styles/entete.css";
import "./styles/fonts.css";

function Entete(props) {
    function connexion_inscription() {
        if (props.pageCourante === "connexion") {
            return (
                <button id="bouton-connexion" onClick={(evt) => props.setPage("inscription")}>
                    S'INSCRIRE
                </button>
            )
        }
        else if (props.pageCourante === "inscription") {
            return (
                <button id="bouton-connexion" onClick={(evt) => props.setPage("connexion")}>
                    SE CONNECTER
                </button>
            )
        }
    }
    return (
        <header>
            <p>COSMOSE</p>
            <nav>
                <button onClick={(evt) => props.setPage("accueil")}>
                    ACCUEIL
                </button>
                {connexion_inscription()}
            </nav>
        </header>
    )
}

export default Entete;