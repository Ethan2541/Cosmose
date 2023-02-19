import Login from './Login.js';
import Logout from './Logout.js';

function NavigationPanel(props){
    return(
        <nav>
            {props.isConnected ? <Logout logout={props.logout}/> : <Login login={props.login}/>}
        </nav>
    );
}

export default NavigationPanel;