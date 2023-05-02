import { useNavigate } from 'react-router-dom';

import './styles/user.css';

function User(props) {
    // State
    const navigate = useNavigate()

    
    return(
        <div className='user' onClick={ (evt) => navigate(`/profil/${props.userLogin}`)}>
            <img draggable='false' src={ props.avatar } alt={ 'Avatar de ' + props.userLogin } />
            <div className='user-metadata'>
                <h3>{ props.userLogin }</h3>
                <h4>{ props.type === 'followers' ? 'Vous suit' : 'Suivi' } depuis le { `${String(props.date.getDate()).padStart(2, '0')}/${String(props.date.getMonth() + 1).padStart(2, '0')}/${props.date.getFullYear()}` }</h4>
            </div>
        </div>
    );
}

export default User;