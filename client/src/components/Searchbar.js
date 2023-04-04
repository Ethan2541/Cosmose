import axios from '../axios.js';

import { FaSearch } from 'react-icons/fa';
import { useState } from 'react';

import './styles/searchbar.css';

function Searchbar(props){
    const [searchbarValue, setSearchbarValue] = useState('');

    function handleFilters(filters) {
        if (props.type === 'allmessages') {
            const token = window.localStorage.getItem('token');
            axios.defaults.headers = {
                Authorization: `Bearer ${token}`,
            };
            axios.get('/search/allmessages', { params: { filters: filters } })
            .then(res => {
                console.log(res.data.updatedMessagesList);
                //props.setList(res.data.updatedMessagesList);
            })
            .catch(err => console.log(err));
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