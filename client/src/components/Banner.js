import { FaPen } from 'react-icons/fa';

import './styles/banner.css';

function Banner(props) {
    function renderEditBanner(evt) {
        if (props.currentUser.login === props.user.login) {
            document.getElementById('banner-edit').style.setProperty('visibility', 'visible');
        }
    }

    function hideEditBanner(evt) {
        if (props.currentUser.login === props.user.login) {
            document.getElementById('banner-edit').style.setProperty('visibility', 'hidden');
        }
    }

    function editBanner(evt) {
        console.log("test");
    }

    function renderEditPicture(evt) {
        if (props.currentUser.login === props.user.login) {
            document.getElementById('picture-edit').style.setProperty('visibility', 'visible');
            document.getElementById('banner-picture').style.setProperty('filter', 'brightness(50%)');
        }
    }

    function hideEditPicture(evt) {
        if (props.currentUser.login === props.user.login) {
            document.getElementById('picture-edit').style.setProperty('visibility', 'hidden');
            document.getElementById('banner-picture').style.setProperty('filter', 'brightness(100%)');
        }
    }

    function editPicture(evt) {
        console.log("test");
    }

    return(
        <div id='banner'>
            <div id='banner-cover'>
                <img draggable='false' src={ props.couverture } alt={ 'Couverture de ' + props.utilisateur } onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner } />
            </div>
            <div id="banner-edit" onMouseEnter={ renderEditBanner } onMouseLeave={ hideEditBanner }>
                <input type='file'></input>
                <span><FaPen /> MODIF. BANNIERE</span>
            </div>
            
            <img id='banner-picture' draggable='false' src={props.avatar} alt={ 'Couverture de ' + props.utilisateur } onMouseEnter={ renderEditPicture } onMouseLeave={ hideEditPicture } />
            <div id="picture-edit" onMouseEnter={ renderEditPicture } onMouseLeave={ hideEditPicture }>
                <input type='file'></input>
                <span><FaPen /></span>
            </div>
        </div>
    );
}

export default Banner;