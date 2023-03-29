import Infos from "./Infos";
import ListeMessages from "./ListeMessages";

function Profil(props) {
    return (
        <div className="profil">
            <Infos />
            <ListeMessages />
        </div>
    );
}

export default Profil;