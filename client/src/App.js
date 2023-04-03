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
    const [elapsedTime, setElapsedTime] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    function sendElapsedTimeToServer() {
        if (user) {
            axios.post('/api/timespent', { time: elapsedTime })
                .then((response) => {
                    console.log('Le temps passé a été mis à jour sur le serveur');
                })
                .catch((err) => console.log(err));
            setElapsedTime(0);
        }
    }

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

    useEffect(() => {
        const updateInterval = 1000; // Mettre à jour le temps toutes les secondes (1000 ms)
        const sendInterval = 5 * 60 * 1000; // Envoyer le temps passé au serveur toutes les 5 minutes (300000 ms)
      
        const updateTime = () => {
          setElapsedTime((prevElapsedTime) => prevElapsedTime + updateInterval);
        };
      
        const intervalId = setInterval(updateTime, updateInterval);
      
        if (elapsedTime !== 0 && elapsedTime % sendInterval === 0) {
          sendElapsedTimeToServer();
        }
      
        return () => {
          clearInterval(intervalId);
        };
      }, [elapsedTime, user]);

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