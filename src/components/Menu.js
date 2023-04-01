import { FaPalette } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react";

import "./styles/menu.css";

function Menu(props) {
    const [toggleParameters, setToggleParameters] = useState(false);

    useEffect(() => {
        let dropdown = document.getElementById("menu-parameters");
        if (toggleParameters) {
            dropdown.style.height = "auto";
        }
        else {
            dropdown.style.height = "0";
        }
    }, [toggleParameters]);

    return(
        <div id="menu">
            <h1>COSMOSE</h1>
            <ul>
                <li className="menu-hover" onClick={ (evt) => { props.setPageCourante("profil") } }>MA CONSTELLATION</li>
                <li>
                    <button className="menu-button menu-hover" onClick={ (evt) => { setToggleParameters(!toggleParameters) } }>PARAMETRES</button>
                    <ul id="menu-parameters">
                        <li>
                            <button className="menu-parameters-button menu-hover" onClick={props.changerTheme}>
                                <FaPalette />
                                Changer le thème
                            </button>
                        </li>
                        <li>
                            <button className="menu-parameters-button menu-hover" onClick={props.deconnexion}>
                                <FaSignOutAlt />
                                Se déconnecter
                            </button>
                        </li>
                    </ul>
                </li>
                <hr />
                <li className="menu-hover">LES PLUS ETOILES</li>
                <li className="menu-hover">ETOILES MONTANTES</li>
                <li className="menu-hover">MA GALAXIE</li>
                <hr />
                <li className="menu-hover"><a id="menu-post" href="#createmessage">PUBLIER</a></li>
            </ul>
        </div>
    );
}

export default Menu;