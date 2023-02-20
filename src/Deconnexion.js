import {useState} from "react";

function Deconnexion(props){
    return(
        <button onClick={props.deconnexion}>Se déconnecter</button>
    );
}

export default Deconnexion;