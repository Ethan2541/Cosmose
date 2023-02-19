import './styles/entete.css';
import './styles/fonts.css';

function Entete(props) {
    return (
        <header>
            <p>COSMOSE</p>
            <button>
                <i class="fa-solid fa-arrow-right-from-bracket"></i> RETOUR
            </button>
        </header>
    )
}

export default Entete;