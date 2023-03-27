import {useEffect, useState} from "react";
import Accueil from "./Accueil.js";
import Connexion from "./Connexion.js";
import Entete from "./Entete.js";
import Inscription from "./Inscription.js";


function HubPrincipal(props){
    const [pageCourante, setPageCourante] = useState(props.pageCourante);
    const [statutConnexion, setStatutConnexion] = useState(props.statutConnexion);
    const [theme, setTheme] = useState("etoile-blanche");

    useEffect(() => {
        let root = document.documentElement;
        if (theme == "etoile-blanche") {
            root.style.setProperty("--ami-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--infos-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--main-bg-color", "rgba(255,255,255,1)");
            root.style.setProperty("--menu-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--message-bg-color", "rgba(255,255,255,1)");
            root.style.setProperty("--message-bordure-color", "rgba(0,0,0,0.25)");
            root.style.setProperty("--soustexte-color", "rgba(0,0,0,0.25)");
            root.style.setProperty("--texte-color", "rgba(0,0,0,1)");
        }
        else if (theme == "matiere-noire") {
            root.style.setProperty("--ami-bg-color", "rgba(23,21,33,1)");
            root.style.setProperty("--infos-bg-color", "rgba(23,21,33,1)");
            root.style.setProperty("--main-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--menu-bg-color", "rgba(23,21,33,0.5)");
            root.style.setProperty("--message-bg-color", "rgba(23,21,33,0.5)");
            root.style.setProperty("--message-bordure-color", "rgba(140,107,203,0.25)");
            root.style.setProperty("--soustexte-color", "rgba(255,255,255,0.25)");
            root.style.setProperty("--texte-color", "rgba(255,255,255,1)");
        }
    }, [theme]);

    const seConnecter = () => {
        setStatutConnexion(true);
        setPageCourante("fil-actualite");
    }

    const seDeconnecter = () => {
        setStatutConnexion(false);
        setPageCourante("accueil");
    }

    function affichage() {
        switch (pageCourante) {
            case "accueil": return <Accueil setPage={setPageCourante} />;
            case "inscription": return <Inscription setPage={setPageCourante} />;
            case "connexion": return <Connexion connexion={seConnecter} />;
            //case "fil-actualite": return <Deconnexion deconnexion={seDeconnecter} />;
            default: return <Accueil setPage={setPageCourante} />;
        }
    }

    function entete() {
        return (pageCourante === "connexion" || pageCourante === "inscription") && <Entete setPage={setPageCourante} pageCourante={pageCourante}/>
    }

    return(
    <div>
        {entete()}
        {affichage()}
    </div>
    );
}

export default HubPrincipal;