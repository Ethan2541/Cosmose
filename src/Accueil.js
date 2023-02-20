import "./styles/accueil.css"

function Accueil(props){
    return(
        <div id="div-accueil">
            <h1 className="h1-accueil">COSMOSE</h1>
            <button id="accueil-connexion" className="button-accueil" onClick={(evnt) => {props.setPage("")}}>Se connecter</button>
            <button id="accueil-inscription" className="button-accueil" onClick={(evnt) => {props.setPage("sign_up")}}>S'inscrire</button>
        </div>
    );
}

export default Accueil;