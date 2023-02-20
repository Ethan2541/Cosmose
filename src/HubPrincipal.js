import {useState} from "react";
import Accueil from "./Accueil.js";
import Entete from "./Entete.js";
import Inscription from "./Inscription.js";
import NavigationPanel from "./NavigationPanel.js";


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
            case "inscription": return <Inscription setPage={setPageCourante}/>;
            default: return <NavigationPanel connexion={seConnecter} deconnexion={seDeconnecter} statutConnexion={statutConnexion}/>;
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