function Offline(props){
    return(
        <div>
            <h1>COSMOSE</h1>
            <button id="connexion" onClick={(evnt) => {props.setPage("")}}>Se connecter</button>
            <button id="inscription" onClick={(evnt) => {props.setPage("sign_up")}}>S'inscrire</button>
        </div>
    );
}

export default Offline;