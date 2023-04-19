import axios from '../axios.js';

import { FaSearch } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

import './styles/searchbar.css';

function Searchbar(props) {
    // States
    const [searchbarValue, setSearchbarValue] = useState('');
    const navigate = useNavigate();


    // Useful functions
    function handleFilters(filters) {
        const token = window.localStorage.getItem('token');
        switch(props.type) {
            // Filter all messages
            case 'allmessages':
                axios.get('/search/allmessages', { params: { filters: filters } }, { headers: { Authorization: `Bearer ${token}`} })
                    .then(res => {
                        props.setList(res.data.updatedMessagesList);
                    })
                    .catch(err => console.log('Could not filter the list of messages'));
                break;

            // Filter the messages from the user
            case 'usermessages':
                axios.get('/search/usermessages', { params: { filters: filters, userLogin: props.userLogin } }, { headers: { Authorization: `Bearer ${token}`} })
                    .then(res => {
                        props.setList(res.data.updatedMessagesList);
                    })
                    .catch(err => console.log('Could not filter the list of messages from the user'));
                break;

            // Search the user
            case 'users':
                axios.get(`/search/users/${filters}`, { headers: { Authorization: `Bearer ${token}`} })
                    .then(res => {
                        if (res.data.filteredUserLogin) {
                            navigate(`/profil/${res.data.filteredUserLogin}`);
                        }
                        else {
                            navigate('/profil');
                        }
                    })
                    .catch(err => console.log('Could not search the user'));
                break;

            default:
                break;
        }
    }
    
    function handleSearchbar(evt) {
        if (evt.key === 'Enter') {
            handleFilters(searchbarValue);
        }
    }
    
    function handleSearchIcon(evt) {
        handleFilters(searchbarValue);
    }
    

    return(
        <div className='searchbar'>
            <input type='text' placeholder={ props.placeholder } onChange={ (evt) => { setSearchbarValue(evt.target.value) } } onKeyDown={ (evt) => { handleSearchbar(evt) } }></input>
            <i><FaSearch title='Rechercher' onClick={ (evt) => { handleSearchIcon(evt) } } /></i>
        </div>
    );
}

export default Searchbar;