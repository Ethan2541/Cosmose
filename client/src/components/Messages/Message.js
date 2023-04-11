import axios from '../../axios.js';

import { FaMinusCircle } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { FaRegCommentDots } from 'react-icons/fa';
import { FaRegStar } from 'react-icons/fa';
import { FaRetweet } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaTrashAlt } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/message.css';

function Message(props){
    const [followStatus, setFollowStatus] = useState(false);
    const [starred, setStarred] = useState(false);
    const location = useLocation();

    function handleStarred(evt) {
        setStarred(!starred);
    }

    function follow() {
        axios.post('/users/follow', { followerLogin: props.currentUserLogin, followedLogin: props.author })
            .catch(err => console.log(err));
    }

    function isFollower() {
        axios.get(`/users/isfollower/${props.currentUserLogin}/${props.author}`)
            .then(res => {
                setFollowStatus(res.data.found);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        isFollower();
    }, [location]);

    return(
        <div id={ props.messageId } className='message'>
            <img draggable='false' src={ props.avatar } alt={ 'Avatar de ' + props.author } />
            <div className='message-metadata'>
                <h3>{ props.author }</h3>
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
                { props.currentUserLogin !== props.author && (followStatus ?
                <button className='message-unfollow-button'>
                <FaMinusCircle title='Ne plus suivre' />
                </button> :
                <button className='message-follow-button' onClick={ follow }>
                    <FaPlusCircle title='Suivre' />
                </button>) }
                { props.currentUserLogin === props.author && 
                <button className='message-delete-button'>
                    <FaTrashAlt title='Supprimer' />
                </button> }
            </div>
        </div>
    );
}

export default Message;