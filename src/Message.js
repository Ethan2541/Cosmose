import {useState} from "react";
import {FaRegStar} from "react-icons/fa";
import {FaStar} from "react-icons/fa";
import {FaTrashAlt} from "react-icons/fa";

import "./styles/message.css"

function Message(props){
    const [starred, setStarred] = useState(false);

    function gererEtoile(evt) {
        setStarred(!starred);
    }

    return(
        <article id={props.idMessage} className="message">
            <img src="" alt={"Avatar de " + props.auteur} />
            <div className="meta-message">
                <h3>{props.auteur}</h3>
                <h4>Le {props.date}</h4>
            </div>
            <p>{props.message}</p>
            <div className="compteurs-message">
                <button onClick={(evt) => gererEtoile(evt)}>
                    {starred ? <FaStar /> : <FaRegStar />}
                </button>
                {props.idUtilisateur == props.idAuteur && 
                <button>
                    <FaTrashAlt />
                </button>}
            </div>
        </article>
    );
}

export default Message;