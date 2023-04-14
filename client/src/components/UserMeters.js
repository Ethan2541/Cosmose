import axios from '../axios.js';

import { FaCommentAlt } from 'react-icons/fa';
import { FaStar } from 'react-icons/fa';
import { FaUserFriends } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/usermeters.css';

function UserMeters(props) {
    const location = useLocation();
    const [userMeters, setUserMeters] = useState({ comments: 0, followers: 0, likes: 0 });

    function getUserMeters() {
        axios.get(`/users/stats/${props.userLogin}`)
            .then(res => {
                const meters = res.data.userMeters;
                setUserMeters(meters);
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getUserMeters();
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
                <p>{ userMeters.messages }</p>
                <FaCommentAlt />
            </div>
        </div>
    );
}

export default UserMeters;