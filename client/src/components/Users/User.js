import "./user.css";

function User(props) {
    return(
        <article id={ props.userId } className="user">
            <img draggable="false" src={ props.avatar } alt={ "Avatar de " + props.userName } />
            <div className="user-metadata">
                <h3>{ props.userName }</h3>
                <h4>Amis depuis le { props.date }</h4>
            </div>
        </article>
    );
}

export default User;