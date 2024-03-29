import axios from '../axios.js';
import CreateMessage from './CreateMessage.js';

import { FaTimesCircle, FaPalette, FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import './styles/menu.css';

function Menu(props) {
    // State
    const [toggleParameters, setToggleParameters] = useState(false);


    // Useful functions
    function getMostStarred() {
        axios.get('/menu/moststarred')
            .then(res => props.setList(res.data.updatedMessagesList))
            .catch(err => console.log('Could not get the most starred messages'));
    }

    function getRisingStars() {
        axios.get('/menu/mostretweeted')
            .then(res => props.setList(res.data.updatedMessagesList))
            .catch(err => console.log('Could not get the most retweeted messages'));
    }

    function getGalaxy() {
        const token = window.localStorage.getItem('token');
        axios.get('/menu/authorandliked', { headers: { Authorization: `Bearer ${token}`} })
            .then(res => props.setList(res.data.updatedMessagesList))
            .catch(err => console.log('Could not get the messages from the user and liked by the user'));
    }

    function getMessagesList() {
        axios.get('/messages')
            .then(res => props.setList(res.data.messagesList))
            .catch(err => console.log('Could not get the global list of messages'));
    }


    // Handle dropdown
    useEffect(() => {
        let dropdown = document.getElementById('menu-parameters');
        if (toggleParameters) {
            dropdown.style.height = 'auto';
        }
        else {
            dropdown.style.height = '0';
        }
    }, [toggleParameters]);


    return(
        <div id='menu'>
            <button id='menu-title' onClick={ getMessagesList }><h1>COSMOSE</h1></button>
            <ul>
                <li><Link to='/profil' className='menu-link'>MA CONSTELLATION</Link></li>
                <li>
                    <button className='menu-button' onClick={ (evt) => { setToggleParameters(!toggleParameters) } }>PARAMETRES</button>
                    <ul id='menu-parameters'>
                        <li>
                            <button className='menu-parameters-button' onClick={ props.switchTheme }>
                                <FaPalette />
                                Changer le thème
                            </button>
                        </li>
                        <li>
                            <button className='menu-parameters-button' onClick={ props.logout }>
                                <FaSignOutAlt />
                                Se déconnecter
                            </button>
                        </li>
                    </ul>
                </li>
                <hr />
                <li><button className='menu-button' onClick={ getMostStarred }>LES PLUS ETOILES</button></li>
                <li><button className='menu-button' onClick={ getRisingStars }>ETOILES MONTANTES</button></li>
                <li><button className='menu-button' onClick={ getGalaxy }>MA GALAXIE</button></li>
                <hr />
                <li><a id='menu-post' className='menu-button' onClick={ (evt) => { window.scrollTo(0,0) } }>PUBLIER</a></li>
            </ul>
        </div>
    );
}

export default Menu;