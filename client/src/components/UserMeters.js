import { FaCommentAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';

import './styles/usermeters.css';

function UserMeters(props) {
    return(
        <div id='usermeters'>
            <div title='Etoiles reçues'>
                <p>9B</p>
                <FaStar />
            </div>
            <p>&bull;</p>
            <div title='Constellations favorables' >
                <p>9B</p>
                <FaUserFriends />
            </div>
            <p>&bull;</p>
            <div title='Publications postées' >
                <p>9B</p>
                <FaCommentAlt />
            </div>
        </div>
    );
}

export default UserMeters;