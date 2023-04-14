import axios from '../../axios.js';

import { FaRegCommentDots } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FaRetweet } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/message.css';

function Message(props){
    const [starred, setStarred] = useState(false);

    function handleStarred(evt) {
        setStarred(!starred);
    }

    function deleteMessage() {
        if (window.confirm('Souhaitez-vous vraiment supprimer ce message ?')) {
            axios.delete('/messages', { params: { author: props.author, date: props.date, message: props.message, messageId: props.messageId, currentUserLogin: props.currentUserLogin } })
                .then(res => props.getMessagesList(5))
                .catch(err => console.log(err));
        }
    }

    return(
        <div id={ props.messageId } className='message'>
            <img draggable='false' src={ props.avatar } alt={ 'Avatar de ' + props.author } />
            <div className='message-metadata'>
                <h3><Link to={ `/profil/${props.author}` }>{ props.author }</ Link></h3>
                <h4>Le {`${String(props.date.getDate()).padStart(2, '0')}/${String(props.date.getMonth() + 1).padStart(2, '0')}/${props.date.getFullYear()} à ${String(props.date.getHours()).padStart(2, '0')}h${String(props.date.getMinutes()).padStart(2, '0')}`}</h4>
            </div>
            <p>{ props.message }</p>
            <div className='message-features'>
                <button className='message-features-button' onClick={ (evt) => handleStarred(evt) }>
                    {starred ? <FaStar title='Ne plus aimer' /> : <FaRegStar title='Aimer' />}
                </button>
                <button className='message-features-button'>
                    <FaRetweet title='Citer' />
                </button>
                <button className='message-features-button'>
                    <FaRegCommentDots title='Commenter' />
                </button>
                { props.currentUserLogin === props.author && 
                <button className='message-delete-button' onClick={ deleteMessage }>
                    <FaTrashAlt title='Supprimer' />
                </button> }
            </div>
        </div>
    );
}

export default Message;