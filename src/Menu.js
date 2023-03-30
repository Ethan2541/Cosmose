import {useEffect} from "react";
import {useState} from "react";

import {FaPalette} from "react-icons/fa";
import {FaSignOutAlt} from "react-icons/fa";


import "./styles/menu.css";

function Menu(props){
    const [parametresVisibles, setParametresVisibles] = useState(false);

    useEffect(() => {
        let dropdown = document.getElementById("parametres-dropdown");
        if (parametresVisibles) {
            dropdown.style.height = "auto";
        }
        else {
            dropdown.style.height = "0";
        }
    }, [parametresVisibles]);

    return(
        <nav id="menu-fil">
            <h1>COSMOSE</h1>
            <ul>
                <li className="menu-hover" onClick={(evt) => {props.setPageCourante("profil")}}>MA CONSTELLATION</li>
                <li>
                    <button className="bouton-menu menu-hover" onClick={(evt) => {setParametresVisibles(!parametresVisibles);}}>PARAMETRES</button>
                    <ul id="parametres-dropdown">
                        <li>
                            <button className="bouton-parametres menu-hover" onClick={props.changerTheme}>
                                <FaPalette />
                                Changer le thème
                            </button>
                        </li>
                        <li>
                            <button className="bouton-parametres menu-hover" onClick={props.deconnexion}>
                                <FaSignOutAlt />
                                Se déconnecter
                            </button>
                        </li>
                    </ul>
                </li>
                <hr />
                <li className="menu-hover">LES PLUS ETOILES</li>
                <li className="menu-hover">TENDANCES</li>
                <li className="menu-hover">MA GALAXIE</li>
                <hr />
                <li className="lien-menu menu-hover"><a className="lien-publier" href="#message-a-publier">PUBLIER</a></li>
            </ul>
        </nav>
    );
}

export default Menu;