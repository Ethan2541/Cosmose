import {useState} from 'react';
import MainPage from './MainPage';

function Logout(props){
    return(
        <button onClick={props.logout}>Logout</button>
    );
}

export default Logout;