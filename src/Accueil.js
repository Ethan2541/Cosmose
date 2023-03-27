import "./styles/accueil.css";
import planete from "./assets/img/planete.png";
import satellite from "./assets/img/satellite.png";

function Accueil(props){
    return(
        <div id="div-accueil">
            <h1 className="h1-accueil">COSMOSE</h1>
            <button id="accueil-connexion" className="button-accueil" onClick={(evt) => {props.setPage("connexion")}}>Se connecter</button>
            <button id="accueil-inscription" className="button-accueil" onClick={(evt) => {props.setPage("inscription")}}>S'inscrire</button>
            <img id="planete" src={planete} alt="Planète"/>
            <img id="satellite" src={satellite} alt="Satellite"/>
        </div>
    );
}

export default Accueil;