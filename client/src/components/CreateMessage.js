import axios from '../axios.js';

import { FaTimesCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import './styles/createmessage.css';

function CreateMessage(props){
    // State
    const [message, setMessage] = useState();


    // Useful functions
    function sendMessage() {
        const token = window.localStorage.getItem('token');
        const data = new FormData();
        const file = document.getElementById('createmessage-image').files[0];
        if (file) {
            data.append('image', file);
            axios.post('/assets', data, { headers: { 'Content-Type': 'multipart/form-data' } })
                .then(res => {
                    const image = res.data.newUrl;
                    const imageId = res.data.newId;
                    const token = window.localStorage.getItem('token');
                    axios.post('/messages', { message: message, image: image, imageId: imageId, retweetId: props.retweet ? props.retweet.messageId : null }, { headers: { Authorization: `Bearer ${token}`} })
                        .then((res) => {
                            document.getElementById('createmessage-content').value = '';
                            props.setRetweet(null);
                            props.getMessagesList(5);
                        })
                        .catch((err) => console.log('Could not create the message'));
                })
                .catch(err => console.log('Could not load the file'));
        }
        else {
            axios.post('/messages', { message: message, image: null, imageId: null, retweetId: props.retweet ? props.retweet.messageId : null }, { headers: { Authorization: `Bearer ${token}`} })
                .then((res) => {
                    document.getElementById('createmessage-content').value = '';
                    props.setRetweet(null);
                    props.getMessagesList(5);
                })
                .catch((err) => console.log('Could not create the message'));
        }
    }

    function handleCreateMessageKeys(evt) {
        if (evt.key == 'Enter') {
            if (!evt.shiftKey) {
                sendMessage();
            }
        }
    }


    return(
        <div id='createmessage'>
            { props.retweet && <div className='createmessage-retweet'><button className='createmessage-cancel' onClick={ (evt) => { props.setRetweet(null) } }><FaTimesCircle /></button>Partagez l'histoire de { props.retweet.author }</div>}
            <textarea id='createmessage-content' maxLength={ 280 } placeholder='Stimulez votre imagination, c&#39;est ici que votre histoire commence !' onChange={ (evt) => setMessage(evt.target.value) } onKeyDown={ (evt) => { handleCreateMessageKeys(evt) } } ></textarea>
            <div id='createmessage-buttons'>
                <button className='createmessage-button'><input id='createmessage-image' type='file' accept='.png, .jpg, .jpeg, .gif'></input>AJOUTER UNE IMAGE</button>
                <button className='createmessage-button' type='submit' onClick={ sendMessage }>PUBLIER</button>
            </div>
        </div>
    );
}

export default CreateMessage;