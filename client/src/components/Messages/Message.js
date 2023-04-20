import axios from '../../axios.js';

import { FaRegStar } from 'react-icons/fa';
import { FaRetweet } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './styles/message.css';

function Message(props) {
    // States
    const [retweetMessage, setRetweetMessage] = useState(null);
    const [starred, setStarred] = useState(false);
    const [stars, setStars] = useState(props.likes);


    // Useful functions
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
                .catch(err => console.log('Could not delete the message'));
        }
    }

    function retweet() {
        const retweet = {messageId: props.messageId, author: props.author, avatar: props.avatar, date: props.date, likes: props.likes, message: props.message }
        props.setRetweet(retweet);
        window.scrollTo(0,0);
    }

    function getRetweetMessage() {
        if (props.retweetId) {
            axios.get(`/messages/id/${props.retweetId}`)
                .then(res => {
                    const retweet = res.data.message;
                    retweet.date = new Date(retweet.date);
                    setRetweetMessage(retweet);
                })
                .catch(err => console.log('Could not get the retweeted message'));
        }
    }

    function like() {
        axios.post('/messages/likes', { userLogin: props.currentUserLogin, messageId: props.messageId })
            .then(res => setStars(stars + 1))
            .catch(err => console.log('Could not like the message'))
    }

    function unlike() {
        axios.delete('/messages/likes', { params: { userLogin: props.currentUserLogin, messageId: props.messageId }})
            .then(res => setStars(stars - 1))
            .catch(err => console.log('Could not unlike the message'));
    }

    function isLiked() {
        axios.get(`/messages/likes/${props.currentUserLogin}/${props.messageId}`)
            .then(res => res.data.like ? setStarred(true) : setStarred(false))
            .catch(err => console.log('Could not check if the user has liked the message'));
    }


    // Check whether the user has liked the message and get the retweeted message if it exists
    useEffect(() => {
        getRetweetMessage();
        isLiked();
    }, [])


    return(
        <div id={ props.messageId } className='message'>
            <Link to={ `/profil/${props.author}` } className='message-avatar-link'><img draggable='false' src={ props.avatar } alt={ 'Avatar de ' + props.author } className='message-avatar' /></ Link>
            <div className='message-metadata'>
                <h3><Link to={ `/profil/${props.author}` }>{ props.author }</ Link></h3>
                <h4>Le {`${String(props.date.getDate()).padStart(2, '0')}/${String(props.date.getMonth() + 1).padStart(2, '0')}/${props.date.getFullYear()} à ${String(props.date.getHours()).padStart(2, '0')}h${String(props.date.getMinutes()).padStart(2, '0')}`}{retweetMessage && ', a partagé :'}</h4>
            </div>
            <div className='message-content-wrapper'>
                <div className='message-content message-border-bottom'>
                    { props.message }
                    { props.image && <hr className='message-content-separator' /> }
                    { props.image && <img className='message-content-image' src={ props.image } alt={ `Image du message de ${props.author}` } /> }
                    { retweetMessage && <hr className='message-content-separator' />}
                    {
                        retweetMessage &&
                        <div id={ retweetMessage.messageId } className='message message-retweet'>
                            <Link to={ `/profil/${retweetMessage.author}` } className='message-avatar-link'><img className='message-avatar' draggable='false' src={ retweetMessage.avatar } alt={ 'Avatar de ' + retweetMessage.author } /></ Link>
                            <div className='message-metadata'>
                                <h3><Link to={ `/profil/${retweetMessage.author}` }>{ retweetMessage.author }</ Link></h3>
                                <h4>Le {`${String(retweetMessage.date.getDate()).padStart(2, '0')}/${String(retweetMessage.date.getMonth() + 1).padStart(2, '0')}/${retweetMessage.date.getFullYear()} à ${String(retweetMessage.date.getHours()).padStart(2, '0')}h${String(retweetMessage.date.getMinutes()).padStart(2, '0')}`}{retweetMessage.retweetId && ', a partagé :'}</h4>
                            </div>
                            <div className='message-content-wrapper'>
                                <div className='message-content'>{ retweetMessage.message }</div>
                            </div>
                        </div>
                    }
                </div>
            </div>
            <div className='message-features'>
                <button className='message-features-button' onClick={ (evt) => handleStarred(evt) }>
                    { stars } {starred ? <FaStar title='Ne plus aimer' onClick={ unlike } /> : <FaRegStar title='Aimer' onClick={ like } />}
                </button>
                <button className='message-features-button'>
                    { props.retweets } <FaRetweet title='Citer' onClick={ retweet } />
                </button>
                { (props.currentUserLogin === props.author || props.currentUserLogin === 'admin') && 
                <button className='message-delete-button' onClick={ deleteMessage }>
                    <FaTrashAlt title='Supprimer' />
                </button> }
            </div>
        </div>
    );
}

export default Message;