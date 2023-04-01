import "./styles/offlineheader.css";

function OfflineHeader(props) {
    function displayLoginOrSignin() {
        if (props.pageCourante === "connexion") {
            return (
                <button className="offlineheader-menu-button" onClick={ (evt) => props.setPageCourante("inscription") }>
                    S'INSCRIRE
                </button>
            )
        }
        else if (props.pageCourante === "inscription") {
            return (
                <button className="offlineheader-menu-button" onClick={ (evt) => props.setPageCourante("connexion") }>
                    SE CONNECTER
                </button>
            )
        }
    }
    return (
        <div id="offlineheader">
            <h1>COSMOSE</h1>
            <nav>
                <button className="no-border" onClick={ (evt) => props.setPageCourante("accueil") }>
                    ACCUEIL
                </button>
                { displayLoginOrSignin() }
            </nav>
        </div>
    )
}

export default OfflineHeader;