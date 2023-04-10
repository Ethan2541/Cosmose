import axios from '../axios.js';

import { FaMinusCircle } from 'react-icons/fa';
import { FaPen } from 'react-icons/fa';
import { FaPlusCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/banner.css';

function Banner(props) {
    const [userAssets, setUserAssets] = useState({ avatar: '/assets/avatar.jpg', cover: '/assets/cover.jpg' });
    const location = useLocation();

    function renderEditBanner(evt) {
        if (props.currentUserLogin === props.userLogin) {
            document.getElementById('banner-edit').style.setProperty('visibility', 'visible');
        }
        else {
            document.getElementById('banner-follow').style.setProperty('visibility', 'visible');
        }
    }

    function hideEditBanner(evt) {
        if (props.currentUserLogin === props.userLogin) {
            document.getElementById('banner-edit').style.setProperty('visibility', 'hidden');
        }
        else {
            document.getElementById('banner-follow').style.setProperty('visibility', 'hidden');
        }
    }

    function editBanner(evt) {
        console.log("test");
    }

    function renderEditPicture(evt) {
        if (props.currentUserLogin === props.userLogin) {
            document.getElementById('picture-edit').style.setProperty('visibility', 'visible');
            document.getElementById('banner-picture').style.setProperty('filter', 'brightness(50%)');
        }
    }

    function hideEditPicture(evt) {
        if (props.currentUserLogin === props.userLogin) {
            document.getElementById('picture-edit').style.setProperty('visibility', 'hidden');
            document.getElementById('banner-picture').style.setProperty('filter', 'brightness(100%)');
        }
    }

    function editPicture(evt) {
        console.log("test");
    }

    function getAssets() {
        axios.get(`/users/assets/${props.userLogin}`)
            .then(res => {
                setUserAssets({ avatar: res.data.avatar, cover: res.data.cover });
            })
            .catch(err => console.log(err));
    }

    useEffect(() => {
        getAssets();
    }, [location])

    return(
        <div id='banner'>
            <div id='banner-cover'>
                <img draggable='false' src={ userAssets.cover } alt={ 'Couverture de ' + props.userLogin } onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner } />
            </div>
            { props.currentUserLogin === props.userLogin ?
            <div id="banner-edit" onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner }>
                <input type='file' accept='.png, .jpg, .jpeg'></input>
                <span><FaPen /> MODIF. BANNIERE</span>
            </div> :
            props.currentUserLogin === props.userLogin ? <button id="banner-follow" onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner }><FaPlusCircle /> SUIVRE</button> :
            <button id="banner-follow" onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner }><FaMinusCircle /> NE PLUS SUIVRE</button>
            }
            
            <img id='banner-picture' draggable='false' src={ userAssets.avatar } alt={ 'Couverture de ' + props.userLogin } onMouseEnter={ renderEditPicture } onMouseLeave={ hideEditPicture } />
            <div id="picture-edit" onMouseEnter={ renderEditPicture } onMouseLeave={ hideEditPicture }>
                <input type='file' accept='.png, .jpg, .jpeg'></input>
                <span><FaPen /></span>
            </div>
        </div>
    );
}

export default Banner;