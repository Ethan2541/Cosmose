import axios from '../../axios.js';
import Message from './Message.js';

import { FaChevronDown } from 'react-icons/fa';

function MessagesList(props) {
        return(
            <div className='messageslist'>
                <ul>
                    { props.messages && props.messages.map((user, index) => {<Message />}) }
                </ul>
                <button className='messageslist-seemore'><FaChevronDown />Voir plus</button>
            </div>
        ); 
}

export default MessagesList;