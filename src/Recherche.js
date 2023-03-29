import {FaSearch} from "react-icons/fa";

import "./styles/recherche.css";

function Recherche(props){
    return(
        <div id="barre-recherche">
            <div className="recherche-input">
                <input type="text" placeholder="Naviguer dans le Cosmos..."></input>
                <span className="recherche-icone">
                    <FaSearch />
                </span>
            </div>
            <input type="checkbox"></input>
        </div>
    );
}

export default Recherche;