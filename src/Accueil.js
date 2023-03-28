import "./styles/accueil.css";

function Accueil(props){
    return(
        <div id="div-accueil">
            <h1 className="h1-accueil">COSMOSE</h1>
            <button id="accueil-connexion" className="button-accueil" onClick={(evt) => {props.setPageCourante("connexion")}}>Se connecter</button>
            <button id="accueil-inscription" className="button-accueil" onClick={(evt) => {props.setPageCourante("inscription")}}>S'inscrire</button>
            <img id="planete" src="./assets/img/planete.png" alt="Planète"/>
        </div>
    );
}

export default Accueil;