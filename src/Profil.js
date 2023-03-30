import {FaHome} from "react-icons/fa";
import {FaPalette} from "react-icons/fa";
import {FaSignOutAlt} from "react-icons/fa";

import Ami from "./Ami.js";
import Banniere from "./Banniere.js";
import Infos from "./Infos.js";
import ListeMessages from "./ListeMessages.js";
import Message from "./Message.js";
import MessageACreer from "./MessageACreer.js";
import Recherche from "./Recherche.js";

import "./styles/profil.css";

function Profil(props) {
    return (
        <main id="profil">
            <div id="profil-entete">
                <h1 id="profil-titre">COSMOSE</h1>
                <Recherche placeholder={"Rechercher des constellations..."} />
                <nav id="profil-nav">
                    <FaHome className="profil-icone" onClick={(evt) => {props.setPageCourante("fil-actualite")}}/>
                    <FaPalette className="profil-icone" onClick={props.changerTheme} />
                    <FaSignOutAlt className="profil-icone" onClick={props.deconnexion} />
                </nav>
            </div>
            <Banniere couverture={"./assets/cover/couverture.jpg"} avatar={"./assets/avatar/riku.png"} />
            <div id="profil-main">
                <div className="profil-gauche">
                    <div className="profil-identifiants">
                        <h2 className="pseudo">Rikkun</h2>
                        <h3 className="login">@rikunanase</h3>
                    </div>
                    <div className="profil-bloc">STATISTIQUES</div>
                    <div className="profil-infos">
                        <Infos />
                    </div>
                    <div className="profil-bloc">VOTRE NEBULEUSE</div>
                    <div className="profil-amis">
                        <Ami ami={"Mitsuki"} idAmi={2} img={"./assets/avatar/mitsuki.png"} date={"01 janvier 2000"} />
                        <Ami ami={"Mitsuki"} idAmi={2} img={"./assets/avatar/mitsuki.png"} date={"01 janvier 2000"} />
                        <Ami ami={"Mitsuki"} idAmi={2} img={"./assets/avatar/mitsuki.png"} date={"01 janvier 2000"} />
                    </div>
                </div>
                <div className="profil-droit">
                    <div id="profil-recherche">
                        <Recherche placeholder={"Naviguer dans votre constellation..."} />
                    </div>
                    <MessageACreer />
                    <div id="profil-liste-messages">
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

export default Profil;