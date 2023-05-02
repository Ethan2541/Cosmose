import axios from '../../axios.js';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/userstats.css';

function UserStats(props) {
    // States
    const [followed, setFollowed] = useState(0);
    const [starsGiven, setStarsGiven] = useState(0);
    const location = useLocation();


    // Useful functions
    function getFollowedNumber() {
        axios.get(`/users/followed/${props.userLogin}`)
            .then(res => setFollowed(res.data.followedList ? res.data.followedList.length : 0))
            .catch(err => console.log(err));
    }

    function getStarsGivenNumber() {
        axios.get(`/users/likes/${props.userLogin}`)
            .then(res => setStarsGiven(res.data.likesList ? res.data.likesList.length : 0))
            .catch(err => console.log(err));
    }


    // Get the amount of stars given, and the number of users followed by the user
    useEffect(() => {
        getFollowedNumber();
        getStarsGivenNumber()
    }, [location]);

    
    return(
        <div id='userstats'>
            <section>
                <div className='userstats-small-field userstats-white'>
                    <p>{ followed }</p>
                </div>
                <div className='userstats-large-field userstats-bordercolor'>
                    <p>constellations suivies</p>
                </div>
            </section>
            <section>
                <div className='userstats-small-field userstats-bordercolor'>
                    <p>{ starsGiven }</p>
                </div>
                <div className='userstats-large-field userstats-white'>
                    <p>étoiles données au total</p>
                </div>
            </section>
        </div>
    );
}

export default UserStats;