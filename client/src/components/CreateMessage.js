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

        axios.post('/messages', { message: message })
            .then((res) => {
                setMessage('');
                window.location.reload();
            })
            .catch((err) => console.log(err));
    }

    return(
        <div id='createmessage'>
            <textarea placeholder='Stimulez votre imagination, c&#39;est ici que votre histoire commence !' onChange={ (evt) => setMessage(evt.target.value) } id='createmessage'></textarea>
            <button type='submit' onClick={ sendMessage }>PUBLIER</button>
        </div>
    );
}

export default CreateMessage;