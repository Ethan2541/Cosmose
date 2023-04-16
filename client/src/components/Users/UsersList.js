import User from './User.js';

import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

import './styles/userslist.css'

function UsersList(props) {
    const [limit, setLimit] = useState(3);

    function handleSeeMore() {
        setLimit(limit + 3);
    }

    return(
        <div className='userslist'>
            <ul>
                { props.users && props.users.slice(0, limit).map((user, index) => <li key={ user._id }><User userLogin={ props.type === 'followed' ? user.followedLogin : user.followerLogin } avatar={ props.type === 'followed' ? user.followedAvatar : user.followerAvatar } date={ new Date(user.date) } type={ props.type } /></li>) }
            </ul>
            { props.users && props.users.length > 0 ? limit < props.users.length && <button className='userslist-seemore' onClick={ handleSeeMore }><FaChevronDown />Voir plus</button> : <button className='userslist-empty'>Liste vide</button> }
        </div>
        
    );
}

export default UsersList;