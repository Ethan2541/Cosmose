import { FaChevronDown } from 'react-icons/fa';
import { useEffect, useState } from 'react';

import User from './User.js';

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
                { props.users && props.users.map((user, index) => { <User userId={ user.id } userLogin={ user.login } avatar={ user.avatar } date={ user.date } /> }) }
            </ul>
            { props.users && props.users.length > 0 ? <button className='userslist-seemore' onClick={ handleSeeMore }><FaChevronDown />Voir plus</button> : <button className='userslist-empty'>Liste vide</button> }
        </div>
        
    );
}

export default UsersList;