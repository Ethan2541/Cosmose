import axios from '../axios.js';

import { FaCommentAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/usermeters.css';

function UserMeters(props) {
    const [userMeters, setUserMeters] = useState({ comments: 0, followers: 0, likes: 0 });
    const location = useLocation();

    useEffect(() => {
        // API pour récupérer les compteurs
    }, [location]);

    return(
        <div id='usermeters'>
            <div title='Etoiles reçues'>
                <p>{ userMeters.likes }</p>
                <FaStar />
            </div>
            <p>&bull;</p>
            <div title='Constellations favorables' >
                <p>{ userMeters.followers }</p>
                <FaUserFriends />
            </div>
            <p>&bull;</p>
            <div title='Publications postées' >
                <p>{ userMeters.comments }</p>
                <FaCommentAlt />
            </div>
        </div>
    );
}

export default UserMeters;