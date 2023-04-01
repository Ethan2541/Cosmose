import "./styles/welcomepage.css";

function WelcomePage(props) {
    return(
        <div id="welcomepage">
            <div id="welcomepage-body">
                <h1>COSMOSE</h1>
                <button id="welcomepage-login" onClick={ (evt) => { props.setPageCourante("connexion") } }>Se connecter</button>
                <button id="welcomepage-signin" onClick={ (evt) => { props.setPageCourante("inscription") } }>S'inscrire</button>
                <img id="welcomepage-planet" draggable="false" src="./assets/img/planete.png" alt="Planète"/>
            </div>
        </div>
    );
}

export default WelcomePage;