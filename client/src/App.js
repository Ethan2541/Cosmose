import axios from 'axios';
import jwt_decode from "jwt-decode";

import HomePage from "./pages/HomePage.js";
import LoginPage from "./pages/LoginPage.js";
import SigninPage from "./pages/SigninPage.js";
import UserPage from "./pages/UserPage.js";
import WelcomePage from "./pages/WelcomePage.js";

import { Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function App(props) {
    const [currentTheme, setCurrentTheme] = useState(window.localStorage.getItem("theme") ? window.localStorage.getItem("theme") : "whitedwarf")
    const [user, setUser] = useState(window.localStorage.getItem("user") ? window.localStorage.getItem("user") : null);
    const location = useLocation();
    const navigate = useNavigate();

    function getToken() {
        const token = localStorage.getItem("token");
        return token;
    }

    function logout() {
        window.localStorage.clear();
        setCurrentTheme("whitedwarf");
        setUser(null);
        navigate("/");
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
            case "darkmatter": setCurrentTheme("purestar"); break;
            case "purestar": setCurrentTheme("blackhole"); break;
            case "blackhole": setCurrentTheme("whitedwarf"); break;
            default: setCurrentTheme("darkmatter");
        }
    }

    useEffect(() => {
        let root = document.documentElement;
        root.setAttribute("theme", currentTheme);
        window.localStorage.setItem("theme", currentTheme);

        const token = window.localStorage.getItem("token");
        axios.defaults.baseURL = 'http://localhost:3001';
        axios.defaults.headers = {
            Authorization: `Bearer ${token}`,
        };

        if (token) {
            axios.post("/users/theme", {theme: currentTheme})
                .catch((err) => console.log(err));
        }
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
            <Route path="/connexion" element={ isOffline(<LoginPage setCurrentTheme={ setCurrentTheme } setUser={ setUser } />) }/>
            <Route path="/inscription" element={ isOffline(<SigninPage />) }/>
            <Route path="/accueil" element={ isAllowed(<HomePage switchTheme={ switchTheme } logout={ logout } />) } />
            <Route path="/profil" element={ isAllowed(<UserPage switchTheme={ switchTheme } logout={ logout } />) }/>
            <Route path="*" element={ <Navigate to="/" replace /> } />
        </Routes>
    </div>
    );
}

export default App;