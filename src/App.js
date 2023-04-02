import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SigninPage from "./pages/SigninPage.js";
import UserPage from "./pages/UserPage.js";
import WelcomePage from "./pages/WelcomePage.js";

import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

function App(props) {
    const [currentTheme, setCurrentTheme] = useState("white-dwarf")
    const [user, setUser] = useState(null);
    const location = useLocation();

    function parseJwt(token) {
        return JSON.parse(window.atob(token.split('.')[1]));
    }

    function getCurrentUser() {
        //return JSON.parse(localStorage.getItem("user"));
        return {"theme": "matiere-noire"};
    }

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
    }

    function renderPageIfAllowed(page) {
        const user = getCurrentUser();
        const renderedPage = user ? page : <Navigate to="/connexion" replace />
        return renderedPage;
    } 

    useEffect(() => {
        let root = document.documentElement;
        root.setAttribute("theme", currentTheme);
    }, [currentTheme]);

    /*
    useEffect(() => {
        const user = getCurrentUser();
        if (user) {
            const decodedToken = parseJwt(user.accessToken);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            }
        }
    }, [location]);
    */

    return(
    <div>
        <Routes>
            <Route path="/" element={ <WelcomePage /> }/>
            <Route path="/connexion" element={ <LoginPage /> }/>
            <Route path="/inscription" element={ <SigninPage /> }/>
            <Route path="/accueil" element={ renderPageIfAllowed(<HomePage setCurrentTheme={ setCurrentTheme } user={ getCurrentUser() } />) } />
            <Route path="/profil" element={ renderPageIfAllowed(<UserPage setCurrentTheme={ setCurrentTheme } user={ getCurrentUser() } />) }/>
            <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
    </div>
    );
}

export default App;