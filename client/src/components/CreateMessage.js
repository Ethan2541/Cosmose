import axios from 'axios';
import "./styles/createmessage.css";

import { useState } from "react";

function CreateMessage(props){
    const [message, setMessage] = useState();

    const token = window.localStorage.getItem("token");

    axios.defaults.baseURL = 'http://localhost:3001';
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    };

    function sendMessage(evt){
        axios.put('/api/messages/', {
            message: message
        })
            .then((res) => {
                setMessage('');
            })
            .catch((err) => console.log(err));
    }

    return(
        <div id="createmessage">
            <textarea maxLength={ 280 } placeholder="Nouveau message... (jusqu'à 280 caractères)" onChange={ (evt) => setMessage(evt.target.value) } id="createmessage"></textarea>
            <button type="submit" onClick={sendMessage}>PUBLIER</button>
        </div>
    );
}

export default CreateMessage;