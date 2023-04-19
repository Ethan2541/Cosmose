import axios from '../axios.js';

import { FaTimesCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import './styles/createmessage.css';

function CreateMessage(props){
    // State
    const [message, setMessage] = useState();


    // Useful function
    function sendMessage(evt){
        const token = window.localStorage.getItem('token');
        axios.post('/messages', { message: message, retweetId: props.retweet ? props.retweet.messageId : null }, { headers: { Authorization: `Bearer ${token}`} })
            .then((res) => {
                document.getElementById('createmessage').children[0].value = '';
                document.getElementById('createmessage').children[1].value = '';
                props.setRetweet(null);
                props.getMessagesList(5);
            })
            .catch((err) => console.log('Could not create the message'));
    }


    return(
        <div id='createmessage'>
            { props.retweet && <div className='createmessage-retweet'><button className='createmessage-cancel' onClick={ (evt) => { props.setRetweet(null) } }><FaTimesCircle /></button>Partagez l'histoire de { props.retweet.author }</div>}
            <textarea maxLength={ 280 } placeholder='Stimulez votre imagination, c&#39;est ici que votre histoire commence !' onChange={ (evt) => setMessage(evt.target.value) } id='createmessage'></textarea>
            <button type='submit' onClick={ sendMessage }>PUBLIER</button>
        </div>
    );
}

export default CreateMessage;