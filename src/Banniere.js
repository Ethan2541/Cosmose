import "./styles/banniere.css";

function Banniere(props) {
    return(
        <div id="banniere">
            <div className="profil-couverture">
                <img draggable="false" src={props.couverture} alt={"Couverture de " + props.utilisateur} />
            </div>
            <img draggable="false" className="profil-avatar" src={props.avatar} alt={"Couverture de " + props.utilisateur} />
        </div>
    );
}

export default Banniere;