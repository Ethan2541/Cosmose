import Connexion from './Connexion.js';
import Logout from './Logout.js';

function NavigationPanel(props){
    return(
        <nav>
            {props.isConnected ? <Logout logout={props.logout}/> : <Connexion login={props.login}/>}
        </nav>
    );
}

export default NavigationPanel;