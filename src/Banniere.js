import "./styles/banniere.css";

function Banniere(props) {
    return(
        <div id="banniere">
            <div className="profil-couverture">
                <img src={props.couverture} alt={"Couverture de " + props.utilisateur} />
            </div>
            <img className="profil-avatar" src={props.avatar} alt={"Couverture de " + props.utilisateur} />
        </div>
    );
}

export default Banniere;