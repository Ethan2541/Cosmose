import { FaPalette } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';

import './styles/menu.css';

function Menu(props) {
    const [toggleParameters, setToggleParameters] = useState(false);

    useEffect(() => {
        let dropdown = document.getElementById('menu-parameters');
        if (toggleParameters) {
            dropdown.style.height = 'auto';
        }
        else {
            dropdown.style.height = '0';
        }
    }, [toggleParameters]);

    return(
        <div id='menu'>
            <h1>COSMOSE</h1>
            <ul>
                <li><Link to='/profil' className='menu-link'>MA CONSTELLATION</Link></li>
                <li>
                    <button className='menu-button' onClick={ (evt) => { setToggleParameters(!toggleParameters) } }>PARAMETRES</button>
                    <ul id='menu-parameters'>
                        <li>
                            <button className='menu-parameters-button' onClick={ props.switchTheme }>
                                <FaPalette />
                                Changer le thème
                            </button>
                        </li>
                        <li>
                            <button className='menu-parameters-button' onClick={ props.logout }>
                                <FaSignOutAlt />
                                Se déconnecter
                            </button>
                        </li>
                    </ul>
                </li>
                <hr />
                <li><button className='menu-button'>LES PLUS ETOILES</button></li>
                <li><button className='menu-button'>ETOILES MONTANTES</button></li>
                <li><button className='menu-button'>MA GALAXIE</button></li>
                <hr />
                <li><a id='menu-post' onClick={ (evt) => window.scrollTo(0,0) }>PUBLIER</a></li>
            </ul>
        </div>
    );
}

export default Menu;