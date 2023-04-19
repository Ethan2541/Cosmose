import Message from './Message.js';

import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

import './styles/messageslist.css';

function MessagesList(props) {
    const [limit, setLimit] = useState(5);

    function handleSeeMore() {
        setLimit(limit + 5);
    }

    return(
        <div className='messageslist'>
            <ul>
                { props.messages && props.messages.slice(0, limit).map((msg, index) => <li key={ msg._id }><Message author={ msg.author } avatar={ msg.avatar } date={ new Date(msg.date) } getMessagesList={ props.getList } likes={ msg.likes } message={ msg.message } messageId={ msg._id } retweetId={ msg.retweetId } retweets={ msg.retweets } setRetweet={ props.setRetweet } currentUserLogin={ props.currentUserLogin } /></li>) }
            </ul>
            { props.messages && props.messages.length > 0 ? limit < props.messages.length && <button className='messageslist-seemore' onClick={ handleSeeMore }><FaChevronDown />Voir plus</button> : <div className='messageslist-empty'>Liste vide</div> }
        </div>
    ); 
}

export default MessagesList;