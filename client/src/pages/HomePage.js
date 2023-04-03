import CreateMessage from "../components/CreateMessage.js";
import Menu from "../components/Menu.js";
import Message from "../components/Messages/Message.js";
import Searchbar from "../components/Searchbar.js";
import StarryBackground from "../components/StarryBackground.js";

import "./styles/homepage.css";

function HomePage(props) {
    return(
        <div id="homepage">
            <div id="homepage-starrybackground">
                <StarryBackground />
            </div>
            <div id="homepage-left"> 
                <Menu switchTheme={ props.switchTheme } logout={ props.logout } />
            </div>
            <div id="homepage-right">
                <div id="homepage-searchbar">
                    <Searchbar  placeholder={ "Naviguer dans le Cosmos..." } type={ "messages" } />
                </div>
                <div id="homepage-posts">
                    <CreateMessage />
                    <div id="homepage-messageslist">
                        <Message messageId={1} author={"Riku-kun"} authorId={1} message={"Coucou les amis !"} userId={props.idUtilisateur} date={"28 mars 2023 à 14h00"} avatar={"./assets/avatar/riku.png"}/>
                        <Message idMessage={2} auteur={"Mitsuki-kun"} idAuteur={2} message={"Ohayo ! Mina-san !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/mitsuki.png"}/>
                        <Message idMessage={3} auteur={"Nagi-san"} idAuteur={3} message={"Hello girls !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/nagi.png"}/>
                        <Message idMessage={4} auteur={"Yamato-san"} idAuteur={4} message={"Yo tout le monde !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/yamato.png"}/>
                        <Message idMessage={5} auteur={"Tamaki-kun"} idAuteur={5} message={"Salut les amis..."} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/tamaki.png"}/>
                        <Message idMessage={6} auteur={"Sogo-san"} idAuteur={6} message={"Bonjour à tous !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/sogo.png"}/>
                        <Message idMessage={7} auteur={"Iori-kun"} idAuteur={7} message={"Bonjour les amis."} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/iori.png"}/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default HomePage;