import Message from './Message.js';

import { FaChevronDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import './styles/messageslist.css';

function MessagesList(props) {
    const [limit, setLimit] = useState(5);

    function handleSeeMore() {
        setLimit(limit + 5);
    }

    useEffect(() => {
        props.getList(limit);
    }, [limit]);

    return(
        <div className='messageslist'>
            <ul>
                { props.messages && props.messages.map((msg, index) => <li key={ msg._id }><Message author={ msg.author } avatar={ msg.avatar } date={ new Date(msg.date) } message={ msg.message } currentUserLogin={ props.currentUserLogin } /></li>) }
            </ul>
            { props.messages && props.messages.length > 0 ? <button className='messageslist-seemore' onClick={ handleSeeMore }><FaChevronDown />Voir plus</button> : <div className='messageslist-empty'>Liste vide</div> }
        </div>
    ); 
}

export default MessagesList;