import { Link } from 'react-router-dom';

import './styles/offlineheader.css';

function OfflineHeader(props) {
    // Useful function
    function displayLoginOrSignUp() {
        if (props.currentPage === 'loginpage') {
            return (
                <Link to='/inscription' className='offlineheader-link offlineheader-button'>
                    S'INSCRIRE
                </Link>
            )
        }
        else if (props.currentPage === 'signuppage') {
            return (
                <Link to='/connexion' className='offlineheader-link offlineheader-button'>
                    SE CONNECTER
                </Link>
            )
        }
    }

    
    return (
        <div id='offlineheader'>
            <h1>COSMOSE</h1>
            <nav>
                <Link to='/' className='offlineheader-link no-border'>
                    ACCUEIL
                </Link>
                { displayLoginOrSignUp() }
            </nav>
        </div>
    )
}

export default OfflineHeader;