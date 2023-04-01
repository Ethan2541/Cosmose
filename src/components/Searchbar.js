import { FaSearch } from "react-icons/fa";

import "./styles/searchbar.css";

function Searchbar(props){
    return(
        <div className="searchbar">
            <input type="text" placeholder={ props.placeholder }></input>
            <i><FaSearch title="Rechercher" /></i>
        </div>
    );
}

export default Searchbar;