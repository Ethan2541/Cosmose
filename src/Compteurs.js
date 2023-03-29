import {FaStar} from "react-icons/fa";
import {FaUserFriends} from "react-icons/fa";

import "./styles/compteurs.css";

function Compteurs(props) {
    return(
        <div className="profil-div-compteurs">
            <div className="profil-compteur">
                <p>9B</p>
                <FaStar />
            </div>
            <p>&bull;</p>
            <div className="profil-compteur">
                <p>9B</p>
                <FaUserFriends />
            </div>
        </div>
    );
}

export default Compteurs;