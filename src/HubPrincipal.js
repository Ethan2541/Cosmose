import {useState} from "react";
import Accueil from "./Accueil.js";
import Connexion from "./Connexion.js";
import Entete from "./Entete.js";
import Inscription from "./Inscription.js";


function HubPrincipal(props){
    const [pageCourante, setPageCourante] = useState(props.pageCourante);
    const [statutConnexion, setStatutConnexion] = useState(props.statutConnexion);

    const seConnecter = () => {
        setStatutConnexion(true);
        setPageCourante("fil-actualite");
    }

    const seDeconnecter = () => {
        setStatutConnexion(false);
        setPageCourante("accueil");
    }

    function affichageCourant(page) {
        switch (pageCourante) {
            case "accueil": return <Accueil setPage={setPageCourante} />;
            case "inscription": return <Inscription setPage={setPageCourante} />;
            case "connexion": return <Connexion connexion={seConnecter} />;
            //case "fil-actualite": return <Deconnexion deconnexion={seDeconnecter} />;
            default: return <Accueil setPage={setPageCourante} />;
        }
    }

    return(
    <div>
        {(pageCourante === "connexion" || pageCourante === "inscription") && <Entete setPage={setPageCourante}/>}
        {affichageCourant(pageCourante)}
    </div>
    );
}

export default HubPrincipal;