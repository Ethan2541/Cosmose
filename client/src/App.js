import jwt_decode from "jwt-decode";

import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SigninPage from "./pages/SigninPage.js";
import UserPage from "./pages/UserPage.js";
import WelcomePage from "./pages/WelcomePage.js";

import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App(props) {
    const [currentTheme, setCurrentTheme] = useState("whitedwarf")
    const [user, setUser] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    function getToken() {
        const token = localStorage.getItem("user");
        return token;
    }

    function logout() {
        localStorage.removeItem("user");
        setUser(null);
        navigate("/")
    }

    function isAllowed(page) {
        const token = getToken();
        const renderedPage = token ? page : <Navigate to="/connexion" replace />;
        return renderedPage;
    }

    function isOffline(page) {
        const token = getToken();
        const renderedPage = token ? <Navigate to="/accueil" replace /> : page;
        return renderedPage;
    }

    function switchTheme() {
        switch(currentTheme) {
            case "whitedwarf": setCurrentTheme("darkmatter"); break;
            case "darkmatter": setCurrentTheme("whitedwarf"); break;
            default: setCurrentTheme("darkmatter");
        }
    }

    useEffect(() => {
        let root = document.documentElement;
        root.setAttribute("theme", currentTheme);
    }, [currentTheme]);

    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedToken = jwt_decode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                logout();
            }
        }
    }, [location]);

    return(
    <div>
        <Routes>
            <Route path="/" element={ isOffline(<WelcomePage />) }/>
            <Route path="/connexion" element={ isOffline(<LoginPage />) }/>
            <Route path="/inscription" element={ isOffline(<SigninPage />) }/>
            <Route path="/accueil" element={ isAllowed(<HomePage switchTheme={ switchTheme } logout={ logout } />) } />
            <Route path="/profil" element={ isAllowed(<UserPage switchTheme={ switchTheme } logout={ logout } />) }/>
            <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
    </div>
    );
}

export default App;