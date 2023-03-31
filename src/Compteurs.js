import {FaCommentAlt} from "react-icons/fa";
import {FaStar} from "react-icons/fa";
import {FaUserFriends} from "react-icons/fa";

import "./styles/compteurs.css";

function Compteurs(props) {
    return(
        <div className="profil-div-compteurs">
            <div className="profil-compteur" title="Etoiles reçues">
                <p>9B</p>
                <FaStar />
            </div>
            <p>&bull;</p>
            <div className="profil-compteur" title="Constellations favorables" >
                <p>9B</p>
                <FaUserFriends />
            </div>
            <p>&bull;</p>
            <div className="profil-compteur" title="Publications postées" >
                <p>9B</p>
                <FaCommentAlt />
            </div>
        </div>
    );
}

export default Compteurs;