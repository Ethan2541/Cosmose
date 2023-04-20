import axios from '../axios.js';

import { FaMinusCircle, FaPen, FaPlusCircle } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/banner.css';

function Banner(props) {
    // States
    const [followStatus, setFollowStatus] = useState(false);
    const [userAssets, setUserAssets] = useState({ avatar: '/assets/avatar.jpg', cover: '/assets/cover.jpg' });
    const location = useLocation();


    // Useful functions
    function renderEditBanner(evt) {
        if (props.currentUserLogin === props.userLogin) {
            document.getElementById('banner-edit').style.setProperty('visibility', 'visible');
        }
    }

    function hideEditBanner(evt) {
        if (props.currentUserLogin === props.userLogin) {
            document.getElementById('banner-edit').style.setProperty('visibility', 'hidden');
        }
    }

    function editBanner(evt) {
        const data = new FormData();
        const file = document.getElementById('banner-cover-input').files[0];
        data.append('image', file);
        axios.post('/assets', data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                const newUrl = res.data.newUrl;
                const newId = res.data.newId;
                axios.put('/users/assets/banner', null, { params: { login: props.currentUserLogin, url: newUrl, id: newId } })
                    .then(res => {
                        console.log('Banner updated successfully');
                        window.location.reload();
                    })
                    .catch(err => console.log('Could not update the banner'));
            })
            .catch(err => console.log('Could not load the file'));
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
        const data = new FormData();
        const file = document.getElementById('banner-picture-input').files[0];
        data.append('image', file);
        axios.post('/assets', data, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(res => {
                const newUrl = res.data.newUrl;
                const newId = res.data.newId;
                axios.put('/users/assets/avatar', null, { params: { login: props.currentUserLogin, url: newUrl, id: newId } })
                    .then(res => {
                        console.log('Avatar updated successfully');
                        window.location.reload();
                    })
                    .catch(err => console.log('Could not update the avatar'));
            })
            .catch(err => console.log('Could not load the file'));
    }

    function isFollower() {
        axios.get(`/users/isfollower/${props.currentUserLogin}/${props.userLogin}`)
            .then(res => {
                setFollowStatus(res.data.found);
            })
            .catch(err => console.log(err));
    }

    function follow() {
        axios.post('/users/follow', { followerLogin: props.currentUserLogin, followedLogin: props.userLogin })
            .then(res => setFollowStatus(true))
            .catch(err => console.log(err));
    }

    function unfollow() {
        axios.delete('/users/follow', { params: { followerLogin: props.currentUserLogin, followedLogin: props.userLogin } })
            .then(res => setFollowStatus(false))
            .catch(err => console.log(err));
    }

    function getAssets() {
        axios.get(`/users/assets/${props.userLogin}`)
            .then(res => {
                setUserAssets({ avatar: res.data.avatar, cover: res.data.cover });
            })
            .catch(err => console.log(err));
    }


    // Get assets and if the current user follows the user whose page is displayed
    useEffect(() => {
        getAssets();
        isFollower();
    }, [location]);

    
    return(
        <div id='banner'>
            <div id='banner-cover'>
                <img draggable='false' src={ userAssets.cover } alt={ 'Couverture de ' + props.userLogin } onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner } />
            </div>
            { props.currentUserLogin === props.userLogin ?
            <div id="banner-edit" onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner }>
                <input id='banner-cover-input' type='file' accept='.png, .jpg, .jpeg, .gif' onChange={ editBanner }></input>
                <span><FaPen /> MODIF. BANNIERE</span>
            </div> :
            followStatus ? <button id="banner-follow" onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner } onClick={ unfollow }><FaMinusCircle /> NE PLUS SUIVRE</button> :
            <button id="banner-follow" onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner } onClick={ follow }><FaPlusCircle /> SUIVRE</button>
            }
            <img id='banner-picture' draggable='false' src={ userAssets.avatar } alt={ 'Avatar de ' + props.userLogin } onMouseEnter={ renderEditPicture } onMouseLeave={ hideEditPicture } />
            <div id="picture-edit" onMouseEnter={ renderEditPicture } onMouseLeave={ hideEditPicture }>
                <input id='banner-picture-input' type='file' accept='.png, .jpg, .jpeg, .gif' onChange={ editPicture }></input>
                <span><FaPen /></span>
            </div>
        </div>
    );
}

export default Banner;