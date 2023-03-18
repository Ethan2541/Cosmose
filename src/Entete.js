import {FaChevronCircleLeft} from "react-icons/fa"

import "./styles/entete.css";
import "./styles/fonts.css";

function Entete(props) {
    return (
        <header>
            <p>COSMOSE</p>
            <nav>
                <button onClick={(evt) => props.setPage("accueil")}>
                    ACCUEIL
                </button>
                <button id="bouton-connexion" onClick={(evt) => props.setPage("connexion")}>
                    SE CONNECTER
                </button>
            </nav>
        </header>
    )
}

export default Entete;