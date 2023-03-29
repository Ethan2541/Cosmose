import {FaSearch} from "react-icons/fa";

import "./styles/recherche-amis.css";

function RechercheAmis(props) {
    return(
        <div id="recherche-amis">
            <input type="text" placeholder="Rechercher des constellations..."></input>
            <span className="recherche-amis-icone">
                <FaSearch />
            </span>
        </div>
    );
}

export default RechercheAmis;