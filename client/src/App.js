import axios from './axios.js';
import jwt_decode from 'jwt-decode';

import HomePage from './pages/HomePage.js';
import LoginPage from './pages/LoginPage.js';
import SignUpPage from './pages/SignUpPage.js';
import UserPage from './pages/UserPage.js';
import WelcomePage from './pages/WelcomePage.js';

import { Navigate, Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

function App(props) {
    // States
    const [currentTheme, setCurrentTheme] = useState(window.localStorage.getItem('theme') ? window.localStorage.getItem('theme') : 'whitedwarf')
    const [currentUser, setCurrentUser] = useState(window.localStorage.getItem('user') ? JSON.parse(window.localStorage.getItem('user')) : null);
    const location = useLocation();
    const navigate = useNavigate();


    // Useful functions
    function getToken() {
        const token = localStorage.getItem('token');
        return token;
    }

    function logout() {
        window.localStorage.clear();
        setCurrentTheme('whitedwarf');
        setCurrentUser(null);
        navigate('/');
    }

    function isAllowed(page) {
        const token = getToken();
        const renderedPage = token ? page : <Navigate to='/connexion' replace />;
        return renderedPage;
    }

    function isOffline(page) {
        const token = getToken();
        const renderedPage = token ? <Navigate to='/accueil' replace /> : page;
        return renderedPage;
    }

    function switchTheme() {
        switch(currentTheme) {
            case 'whitedwarf': setCurrentTheme('darkmatter'); break;
            case 'darkmatter': setCurrentTheme('purestar'); break;
            case 'purestar': setCurrentTheme('blackhole'); break;
            case 'blackhole': setCurrentTheme('whitedwarf'); break;
            default: setCurrentTheme('darkmatter');
        }
    }


    // Change stored theme
    useEffect(() => {
        let root = document.documentElement;
        root.setAttribute('theme', currentTheme);
        window.localStorage.setItem('theme', currentTheme);

        const token = window.localStorage.getItem('token');        
        if (token) {
            axios.put('/users/theme', { theme: currentTheme }, { headers: { Authorization: `Bearer ${token}`} })
                .catch((err) => console.log('Could not change the stored theme'));
        }
    }, [currentTheme]);


    // log out if necessary
    useEffect(() => {
        const token = getToken();
        if (token) {
            const decodedToken = jwt_decode(token);
            if (decodedToken.exp * 1000 < Date.now()) {
                window.localStorage.clear();
                setCurrentTheme('whitedwarf');
                setCurrentUser(null);
                navigate('/');
            }
        }
        window.scrollTo(0,0);
    }, [location]);

    
    return(
        <div>
            <Routes>
                <Route path='/' element={ isOffline(<WelcomePage />) }/>
                <Route path='/connexion' element={ isOffline(<LoginPage setCurrentTheme={ setCurrentTheme } setCurrentUser={ setCurrentUser } />) }/>
                <Route path='/inscription' element={ isOffline(<SignUpPage />) }/>
                <Route path='/accueil' element={ isAllowed(<HomePage switchTheme={ switchTheme } logout={ logout } currentUser={ currentUser } />) } />
                <Route path='/profil' element={ isAllowed(<UserPage switchTheme={ switchTheme } logout={ logout } currentUser={ currentUser } />) }/>
                <Route path='/profil/:login' element={ isAllowed(<UserPage switchTheme={ switchTheme } logout={ logout } currentUser={ currentUser } />) }/>
                <Route path='*' element={ <Navigate to='/' replace /> } />
            </Routes>
        </div>
    );
}

export default App;