import Message from './Message.js';

import { FaChevronDown } from 'react-icons/fa';

import './styles/messageslist.css';

function MessagesList(props) {
    return(
        <div className='messageslist'>
            <ul>
                { props.messages && props.messages.map((msg, index) => <Message author={ msg.author } avatar={ msg.avatar } date={ msg.date } key={ msg._id } message={ msg.message } />) }
            </ul>
            <button className='messageslist-seemore' onClick={ (evt) => { props.setLimit(props.currentLimit + 5); console.log(props.currentLimit) } }><FaChevronDown />Voir plus</button>
        </div>
    ); 
}

export default MessagesList;