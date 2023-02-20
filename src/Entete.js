import {FaChevronCircleLeft} from "react-icons/fa"

import "./styles/entete.css";
import "./styles/fonts.css";

function Entete(props) {
    return (
        <header>
            <p>COSMOSE</p>
            <button onClick={(evt) => props.setPage("accueil")}>
                <i><FaChevronCircleLeft /></i> RETOUR
            </button>
        </header>
    )
}

export default Entete;