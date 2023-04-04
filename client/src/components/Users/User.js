import './user.css';

function User(props) {
    return(
        <div id={ props.userId } className='user'>
            <img draggable='false' src={ props.avatar } alt={ 'Avatar de ' + props.userLogin } />
            <div className='user-metadata'>
                <h3>{ props.userLogin }</h3>
                <h4>Amis depuis le { props.date }</h4>
            </div>
        </div>
    );
}

export default User;