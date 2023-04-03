import axios from "axios";

import { FaSearch } from "react-icons/fa";
import { useState } from "react";

import "./styles/searchbar.css";

axios.defaults.baseURL = 'http://localhost:3001';

function Searchbar(props){
    const [searchbarValue, setSearchbarValue] = useState("");

    function handleFilters(filters) {
        console.log(searchbarValue);
        if (props.type === "messages") {
            axios.get("/search/messages", { params: { filters: filters } })
            .then(res => {
                console.log(res.data.updatedMessagesList);
                //props.setList(res.data.updatedMessagesList);
            })
            .catch(err => console.log(err));
        }
    }
    
    function handleSearchbar(evt) {
        if (evt.key === "Enter") {
            handleFilters(searchbarValue);
        }
    }
    
    function handleSearchIcon(evt) {
        handleFilters(searchbarValue);
    }
    
    return(
        <div className="searchbar">
            <input type="text" placeholder={ props.placeholder } onChange={ (evt) => { setSearchbarValue(evt.target.value) } } onKeyDown={ (evt) => { handleSearchbar(evt) } }></input>
            <i><FaSearch title="Rechercher" onClick={ (evt) => { handleSearchIcon(evt) } } /></i>
        </div>
    );
}

export default Searchbar;