import {useState} from 'react';
import NavigationPanel from './NavigationPanel.js';
import Signup from './Signup.js';
import "./style/mainPage.css"

function MainPage(props){
    const [pageCourante, setPageCourante] = useState(props.pageCourante);
    const [isConnected, setIsConnected] = useState(props.isConnected);

    function getConnected(){
        setIsConnected(true);
        setPageCourante("message_page");
    }

    function setLogout(){
        setIsConnected(false);
        setPageCourante("signin_page");
    }

    return(
    <div>
        <header>
            <p>COSMOSE</p>
            <button>
                <i className="fa-solid fa-arrow-right-from-bracket"></i> RETOUR
            </button>
        </header>
        {pageCourante === "signup_page" ? <Signup/> :
        <NavigationPanel login={getConnected} logout={setLogout} isConnected={isConnected}/>
        }
    </div>
    );
}

export default MainPage;