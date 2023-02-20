import {useState} from "react";
import Accueil from "./Accueil.js";
import Entete from "./Entete.js";
import Inscription from "./Inscription.js";
import NavigationPanel from "./NavigationPanel.js";


function MainPage(props){
    const [pageCourante, setPageCourante] = useState(props.pageCourante);
    const [isConnected, setIsConnected] = useState(props.isConnected);

    const getConnected = () => {
        setIsConnected(true);
        setPageCourante("message_page");
    }

    const setLogout = () => {
        setIsConnected(false);
        setPageCourante("signin_page");
    }

    return(
    <div>
        <Entete />
        {(() => {
        switch (pageCourante) {
          case "offline": return <Accueil setPage={setPageCourante}/>;
          case "sign_up": return <Inscription setPage={setPageCourante}/>;
          default: return <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>;
        }
        })()}
    </div>
    );
}

export default MainPage;

/*
<header>
            <p>COSMOSE</p>
            {pageCourante === "offline" ? null :
            <button onClick={(evnt) => setPageCourante("offline")}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> RETOUR
            </button>
            }
        </header>
*/