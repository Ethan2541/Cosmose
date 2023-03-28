import "./styles/accueil.css";
import planete from "./assets/img/planete.png";

function Accueil(props){
    return(
        <div id="div-accueil">
            <h1 className="h1-accueil">COSMOSE</h1>
            <button id="accueil-connexion" className="button-accueil" onClick={(evt) => {props.setPageCourante("connexion")}}>Se connecter</button>
            <button id="accueil-inscription" className="button-accueil" onClick={(evt) => {props.setPageCourante("inscription")}}>S'inscrire</button>
            <img id="planete" src={planete} alt="Planète"/>
        </div>
    );
}

export default Accueil;