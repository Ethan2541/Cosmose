import { useEffect, useState } from "react";
import WelcomePage from "./pages/WelcomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SigninPage from "./pages/SigninPage.js";
import HomePage from "./pages/HomePage.js";
import UserPage from "./pages/UserPage.js";

function App(props){
    const [pageCourante, setPageCourante] = useState(props.pageCourante);
    const [statutConnexion, setStatutConnexion] = useState(props.statutConnexion);
    const [idUtilisateur, setIdUtilisateur] = useState(1);
    const [theme, setTheme] = useState("etoile-blanche");

    useEffect(() => {
        let root = document.documentElement;
        if (theme === "etoile-blanche") {
            root.style.setProperty("--ami-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--ami-bordure-color", "rgba(0,0,0,0.1)");
            root.style.setProperty("--bordure-color", "rgba(140,107,203,1)");
            root.style.setProperty("--etoiles-color", "rgba(140,107,203,0.75)");
            root.style.setProperty("--etoiles-degrade1-color", "rgba(140,107,203,0.1)");
            root.style.setProperty("--etoiles-degrade2-color", "rgba(140,107,203,1)");
            root.style.setProperty("--infos-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--main-bg-color", "rgba(255,255,255,1)");
            root.style.setProperty("--menu-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--message-bg-color", "rgba(255,255,255,0.85)");
            root.style.setProperty("--message-bordure-color", "rgba(0,0,0,0.25)");
            root.style.setProperty("--publication-bg-color", "rgba(255,255,255,0.85)");
            root.style.setProperty("--publication-color", "rgba(0,0,0,0.85)");
            root.style.setProperty("--recherche-bg-color", "rgba(0,0,0,0.075)");
            root.style.setProperty("--recherche-color", "rgba(0,0,0,0.5)");
            root.style.setProperty("--soustexte-color", "rgba(0,0,0,0.5)");
            root.style.setProperty("--texte-color", "rgba(0,0,0,1)");
        }

        else if (theme === "matiere-noire") {
            root.style.setProperty("--ami-bg-color", "rgba(23,21,33,1)");
            root.style.setProperty("--ami-bordure-color", "rgba(0,0,0,0.1)");
            root.style.setProperty("--bordure-color", "rgba(140,107,203,1)");
            root.style.setProperty("--etoiles-color", "rgba(255,255,255,0.25)");
            root.style.setProperty("--etoiles-degrade1-color", "rgba(255,255,255,0.1)");
            root.style.setProperty("--etoiles-degrade2-color", "rgba(255,255,255,1)");
            root.style.setProperty("--infos-bg-color", "rgba(23,21,33,1)");
            root.style.setProperty("--main-bg-color", "rgba(44,43,74,1)");
            root.style.setProperty("--menu-bg-color", "rgba(23,21,33,1)");
            root.style.setProperty("--message-bg-color", "rgba(23,21,33,0.85)");
            root.style.setProperty("--message-bordure-color", "rgba(140,107,203,0.25)");
            root.style.setProperty("--publication-bg-color", "rgba(23,21,33,0.85)");
            root.style.setProperty("--publication-color", "rgba(255,255,255,0.85)");
            root.style.setProperty("--recherche-bg-color", "rgba(255,255,255,0.05)");
            root.style.setProperty("--recherche-color", "rgba(255,255,255,0.5)");
            root.style.setProperty("--soustexte-color", "rgba(255,255,255,0.5)");
            root.style.setProperty("--texte-color", "rgba(255,255,255,1)");
        }
    }, [theme]);

    function seConnecter() {
        setStatutConnexion(true);
        setPageCourante("fil-actualite");
    }

    function seDeconnecter() {
        setStatutConnexion(false);
        setPageCourante("accueil");
    }

    function changerTheme() {
        switch(theme) {
            case "etoile-blanche": setTheme("matiere-noire"); break;
            case "matiere-noire": setTheme("etoile-blanche"); break;
            default: setTheme("etoile-blanche"); break;
        }
    }

    function affichage() {
        if (statutConnexion) {
            switch (pageCourante) {
                case "accueil": return <WelcomePage setPageCourante={setPageCourante} />;
                case "inscription": return <SigninPage setPageCourante={setPageCourante} />;
                case "connexion": return <LoginPage connexion={seConnecter} />;
                case "fil-actualite": return <HomePage setPageCourante={setPageCourante} idUtilisateur={idUtilisateur} deconnexion={seDeconnecter} changerTheme={changerTheme} />;
                case "profil": return <UserPage setPageCourante={setPageCourante} idUtilisateur={idUtilisateur} deconnexion={seDeconnecter} changerTheme={changerTheme} />;
                default: return <WelcomePage setPageCourante={setPageCourante} />;
            }
        }
        else {
            switch (pageCourante) {
                case "accueil": return <WelcomePage setPageCourante={setPageCourante} />;
                case "inscription": return <SigninPage setPageCourante={setPageCourante} />;
                case "connexion": return <LoginPage connexion={seConnecter} />;
                default: return <WelcomePage setPageCourante={setPageCourante} />;
            }
        }
    }

    return(
    <div>
        { affichage() }
    </div>
    );
}

export default App;