import "./styles/accueil.css"

function Accueil(props){
    return(
        <div id="div-accueil">
            <h1 className="h1-accueil">COSMOSE</h1>
            <button id="accueil-connexion" className="button-accueil" onClick={(evt) => {props.setPage("connexion")}}>Se connecter</button>
            <button id="accueil-inscription" className="button-accueil" onClick={(evt) => {props.setPage("inscription")}}>S'inscrire</button>
        </div>
    );
}

export default Accueil;