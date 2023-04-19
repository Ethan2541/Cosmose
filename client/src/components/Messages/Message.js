import axios from '../../axios.js';

import { FaRegStar } from 'react-icons/fa';
import { FaRetweet } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/message.css';

function Message(props){
    const [retweetMessage, setRetweetMessage] = useState(null);
    const [starred, setStarred] = useState(false);

    function handleStarred(evt) {
        setStarred(!starred);
    }

    function deleteMessage() {
        if (window.confirm('Souhaitez-vous vraiment supprimer ce message ?')) {
            axios.delete('/messages', { params: { author: props.author, date: props.date, message: props.message, messageId: props.messageId, currentUserLogin: props.currentUserLogin } })
                .then(res => {
                    props.setRetweet(null);
                    props.getMessagesList(5);
                })
                .catch(err => console.log(err));
        }
    }

    function retweet() {
        const retweet = {messageId: props.messageId, author: props.author, avatar: props.avatar, date: props.date, likes: props.likes, message: props.message }
        props.setRetweet(retweet);
    }

    function getRetweetMessage() {
        if (props.retweetId) {
            axios.get(`/messages/id/${props.retweetId}`)
                .then(res => {
                    const retweet = res.data.message;
                    retweet.date = new Date(retweet.date);
                    setRetweetMessage(retweet);
                })
                .catch(err => console.log('Could not get the shared story'));
        }
    }

    useEffect(() => {
        getRetweetMessage();
    }, [])

    return(
        <div id={ props.messageId } className='message'>
            <img draggable='false' src={ props.avatar } alt={ 'Avatar de ' + props.author } />
            <div className='message-metadata'>
                <h3><Link to={ `/profil/${props.author}` }>{ props.author }</ Link></h3>
                <h4>Le {`${String(props.date.getDate()).padStart(2, '0')}/${String(props.date.getMonth() + 1).padStart(2, '0')}/${props.date.getFullYear()} à ${String(props.date.getHours()).padStart(2, '0')}h${String(props.date.getMinutes()).padStart(2, '0')}`}{retweetMessage && ', a partagé :'}</h4>
            </div>
            <div className='message-content'>
                { props.message }
                {
                    retweetMessage &&
                    <div id={ retweetMessage.messageId } className='message message-retweet'>
                        <img draggable='false' src={ retweetMessage.avatar } alt={ 'Avatar de ' + retweetMessage.author } />
                        <div className='message-metadata'>
                            <h3><Link to={ `/profil/${retweetMessage.author}` }>{ retweetMessage.author }</ Link></h3>
                            <h4>Le {`${String(retweetMessage.date.getDate()).padStart(2, '0')}/${String(retweetMessage.date.getMonth() + 1).padStart(2, '0')}/${retweetMessage.date.getFullYear()} à ${String(retweetMessage.date.getHours()).padStart(2, '0')}h${String(retweetMessage.date.getMinutes()).padStart(2, '0')}`}{retweetMessage.retweetId && ', a partagé :'}</h4>
                        </div>
                        <div className='message-content'>{ retweetMessage.message }</div>
                    </div>
                }
            </div>
            <div className='message-features'>
                <button className='message-features-button' onClick={ (evt) => handleStarred(evt) }>
                    { props.likes } {starred ? <FaStar title='Ne plus aimer' /> : <FaRegStar title='Aimer' />}
                </button>
                <button className='message-features-button'>
                    { props.retweets } <FaRetweet title='Citer' onClick={ retweet } />
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