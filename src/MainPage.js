import {useState} from 'react';
import NavigationPanel from './NavigationPanel.js';
import Signup from './Signup.js';
import "./style/mainPage.css";
import Offline from './Offline';

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
        <header>
            <p>COSMOSE</p>
            {pageCourante === "offline" ? null :
            <button onClick={(evnt) => setPageCourante("offline")}>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> RETOUR
            </button>
            }
        </header>
        {(() => {
        switch (pageCourante) {
          case "offline": return <Offline setPage={setPageCourante}/>;
          case "sign_up": return <Signup />;
          default: return <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>;
        }
        })()}
    </div>
    );
}

export default MainPage;