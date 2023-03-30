import {FaSearch} from "react-icons/fa";

import "./styles/recherche.css";

function Recherche(props){
    return(
        <div id="barre-recherche">
            <input type="text" placeholder={props.placeholder}></input>
            <span className="recherche-icone">
                <FaSearch />
            </span>
        </div>
    );
}

export default Recherche;