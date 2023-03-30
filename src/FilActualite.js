import Menu from "./Menu.js";
import Message from "./Message.js";
import MessageACreer from "./MessageACreer.js";
import Recherche from "./Recherche.js";

import Etoiles from "./Etoiles.js";

import "./styles/fil-actualite.css";

function FilActualite(props){
    return(
        <main id="fil-actualite">
            <div id="fil-etoiles">
                <Etoiles />
            </div>
            <div id="fil-gauche"> 
                <Menu setPageCourante={props.setPageCourante} deconnexion={props.deconnexion} changerTheme={props.changerTheme}/>
            </div>
            <div id="fil-droit">
                <div id="fil-recherche">
                    <Recherche  placeholder={"Naviguer dans le Cosmos..."} />
                </div>
                <div id="fil-tout-message">
                    <MessageACreer />
                    <div id="fil-liste-messages">
                        <Message idMessage={1} auteur={"Riku-kun"} idAuteur={1} message={"Coucou les amis !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/riku.png"}/>
                        <Message idMessage={2} auteur={"Mitsuki-kun"} idAuteur={2} message={"Ohayo ! Mina-san !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/mitsuki.png"}/>
                        <Message idMessage={3} auteur={"Nagi-san"} idAuteur={3} message={"Hello girls !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/nagi.png"}/>
                        <Message idMessage={4} auteur={"Yamato-san"} idAuteur={4} message={"Yo tout le monde !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/yamato.png"}/>
                        <Message idMessage={5} auteur={"Tamaki-kun"} idAuteur={5} message={"Salut les amis..."} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/tamaki.png"}/>
                        <Message idMessage={6} auteur={"Sogo-san"} idAuteur={6} message={"Bonjour à tous !"} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/sogo.png"}/>
                        <Message idMessage={7} auteur={"Iori-kun"} idAuteur={7} message={"Bonjour les amis."} idUtilisateur={props.idUtilisateur} date={"28 mars 2023 à 14h00"} img={"./assets/avatar/iori.png"}/>
                    </div>
                </div>
            </div>
        </main>
    );
}

export default FilActualite;