import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SigninPage from "./pages/SigninPage.js";
import UserPage from "./pages/UserPage.js";
import WelcomePage from "./pages/WelcomePage.js";

import { Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";

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

    return(
    <div>
        <Routes>
            <Route path="/" element={ <WelcomePage /> }/>
            <Route path="/connexion" element={ <LoginPage /> }/>
            <Route path="/inscription" element={ <SigninPage /> }/>
            <Route path="/accueil" element={ <HomePage /> }/>
            <Route path="/profil" element={ <UserPage /> }/>
        </Routes>
    </div>
    );
}

export default App;