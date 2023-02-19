import './styles/entete.css';
import './styles/fonts.css';
import { FaDoorClosed } from "react-icons/fa";

function Entete(props) {
    return (
        <header>
            <p>COSMOSE</p>
            <button>
            <FaDoorClosed /> RETOUR
            </button>
        </header>
    )
}

export default Entete;