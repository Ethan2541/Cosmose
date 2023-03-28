import "./styles/menu.css";

function Menu(props){
    return(
        <nav id="menu-fil">
            <h1>COSMOSE</h1>
            <a className="lien-menu" onClick={(evt) => {props.setPageCourante("accueil")}}>ACCUEIL</a>
            <a className="lien-menu">MA CONSTELLATION</a>
            <button className="bouton-menu">PARAMETRES</button>
            <hr />
            <a className="lien-menu">LES PLUS ETOILES</a>
            <a className="lien-menu">TENDANCES</a>
            <a className="lien-menu">MA GALAXIE</a>
            <hr />
            <button className="bouton-menu bouton-publier">PUBLIER</button>
            <hr/>
            <button className="bouton-menu bouton-deconnexion" onClick={(evt) => {props.deconnexion()}}>SE DECONNECTER</button>
        </nav>
    );
}

export default Menu;