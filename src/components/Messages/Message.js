import { FaMinusCircle } from "react-icons/fa";
import { FaPlusCircle } from "react-icons/fa";
import { FaRegCommentDots } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaRetweet } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaTrashAlt } from "react-icons/fa";
import { useState } from "react";

import "./message.css"

function Message(props){
    const [starred, setStarred] = useState(false);

    function handleStarred(evt) {
        setStarred(!starred);
    }

    return(
        <div id={ props.messageId } className="message">
            <img draggable="false" src={ props.avatar } alt={ "Avatar de " + props.author } />
            <div className="message-metadata">
                <h3>{ props.author }</h3>
                <h4>Le { props.date }</h4>
            </div>
            <p>{ props.message }</p>
            <div className="message-features">
                <button className="message-features-button" onClick={ (evt) => handleStarred(evt) }>
                    {starred ? <FaStar title="Ne plus aimer" /> : <FaRegStar title="Aimer" />}
                </button>
                <button className="message-features-button">
                    <FaRetweet title="Répondre" />
                </button>
                <button className="message-features-button">
                    <FaRegCommentDots title="Commenter" />
                </button>
                { props.userId != props.authorId && 
                <button className="message-follow-button">
                    <FaPlusCircle title="Suivre" />
                </button> }
                { props.userId == props.authorId && 
                <button className="message-delete-button">
                    <FaTrashAlt title="Supprimer" />
                </button> }
            </div>
        </div>
    );
}

export default Message;