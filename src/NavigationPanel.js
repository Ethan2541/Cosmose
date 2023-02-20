import Connexion from './Connexion.js';
import Deconnexion from './Deconnexion.js';

function NavigationPanel(props){
    return(
        <nav>
            {props.statutConnexion ? <Deconnexion deconnexion={props.deconnexion}/> : <Connexion connexion={props.connexion}/>}
        </nav>
    );
}

export default NavigationPanel;