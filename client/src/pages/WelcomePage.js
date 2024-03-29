import { Link } from 'react-router-dom';

import './styles/welcomepage.css';

function WelcomePage(props) {
    return(
        <div id='welcomepage'>
            <main id='welcomepage-body'>
                <h1>COSMOSE</h1>
                <Link to='connexion' id='welcomepage-login'>Se connecter</Link>
                <Link to='inscription' id='welcomepage-signin'>S'inscrire</Link>
                <img id='welcomepage-planet' draggable='false' src='./assets/planete.png' alt='Planète'/>
            </main>
        </div>
    );
}

export default WelcomePage;