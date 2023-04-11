import { useNavigate } from 'react-router-dom';

import './styles/user.css';

function User(props) {
    const navigate = useNavigate()
    return(
        <div className='user' onClick={ (evt) => navigate(`${props.userLogin}`)}>
            <img draggable='false' src={ props.avatar } alt={ 'Avatar de ' + props.userLogin } />
            <div className='user-metadata'>
                <h3>{ props.userLogin }</h3>
                <h4>{ props.type === 'follower' ? 'Vous suit' : 'Suivi' } depuis le { props.date }</h4>
            </div>
        </div>
    );
}

export default User;