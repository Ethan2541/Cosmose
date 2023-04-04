import axios from '../axios.js';
import './styles/createmessage.css';

import { useState } from 'react';

function CreateMessage(props){
    const [message, setMessage] = useState();

    function sendMessage(evt){
        const token = window.localStorage.getItem('token');
        axios.defaults.headers = {
            Authorization: `Bearer ${token}`,
        };
        axios.put('/api/messages/', {
            message: message
        })
            .then((res) => {
                setMessage('');
            })
            .catch((err) => console.log(err));
    }

    return(
        <div id='createmessage'>
            <textarea maxLength={ 280 } placeholder='Nouveau message... (jusqu&#39;à 280 caractères)' onChange={ (evt) => setMessage(evt.target.value) } id='createmessage'></textarea>
            <button type='submit' onClick={sendMessage}>PUBLIER</button>
        </div>
    );
}

export default CreateMessage;