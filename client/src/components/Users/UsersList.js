import { FaChevronDown } from 'react-icons/fa';
import { useState } from 'react';

import User from './User.js';

import './styles/userslist.css'

function UsersList(props) {
    const [currentNumber, setCurrentNumber] = useState(5);
    return(
        <div className='userslist'>
            <ul>
                {/*props.users.map((user, index) => {<User />})*/}
            </ul>
            <button className='userslist-seemore'><FaChevronDown />Voir plus</button>
        </div>
        
    );
}

export default UsersList;