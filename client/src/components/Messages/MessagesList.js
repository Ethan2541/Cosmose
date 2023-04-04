import axios from '../../axios.js';
import Message from './Message.js';

function MessagesList(props){
    const token = window.localStorage.getItem('token');
    axios.defaults.headers = {
        Authorization: `Bearer ${token}`,
    };
    axios.get('/api/messages/')
        .then((res) => {
            return(
                res.messages.map((msg, index) => {<Message />})
            );
        })
        .catch((err) => console.log(err));

    
}

export default MessagesList;