import User from './User.js';

import { FaChevronDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import './styles/userslist.css'

function UsersList(props) {
    const [limit, setLimit] = useState(5);

    function handleSeeMore() {
        setLimit(limit + 5);
    }

    useEffect(() => {
        props.getList(limit);
    }, [limit]);

    return(
        <div className='userslist'>
            <ul>
                { props.users && props.users.map((user, index) => <li key={ user._id }><User userLogin={ props.type === 'followed' ? user.followedLogin : user.followerLogin } avatar={ props.type === 'followed' ? user.followedAvatar : user.followerAvatar } date={ new Date(user.date) } type={ props.type } /></li>) }
            </ul>
            { props.users && props.users.length > 0 ? <button className='userslist-seemore' onClick={ handleSeeMore }><FaChevronDown />Voir plus</button> : <button className='userslist-empty'>Liste vide</button> }
        </div>
        
    );
}

export default UsersList;