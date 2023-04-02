import "./styles/banner.css";

function Banner(props) {
    return(
        <div id="banner">
            <div>
                <img draggable="false" src={ props.couverture } alt={ "Couverture de " + props.utilisateur } />
            </div>
            <img draggable="false" src={props.avatar} alt={ "Couverture de " + props.utilisateur } />
        </div>
    );
}

export default Banner;