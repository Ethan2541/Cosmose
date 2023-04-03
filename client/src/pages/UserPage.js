import { FaPalette } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

import Banner from "../components/Banner.js";
import CreateMessage from "../components/CreateMessage.js";
import Message from "../components/Messages/Message.js";
import Searchbar from "../components/Searchbar.js";
import User from "../components/Users/User.js";
import UserMeters from "../components/UserMeters.js";
import UserStatsWrapper from "../components/UserStats/UserStatsWrapper.js";

import "./styles/userpage.css";

function UserPage(props) {
    return (
        <div id="userpage">
            <header>
                <Link to="accueil" id="userpage-title"><h1>COSMOSE</h1></Link>
                <Searchbar placeholder={"Rechercher des constellations..."} />
                <div id="userpage-parameters">
                    <i><FaPalette title="Changer de thème" onClick={ props.switchTheme } /></i>
                    <i><FaSignOutAlt title="Se déconnecter" onClick={ props.logout } /></i>
                </div>
            </header>
            <Banner couverture={"./assets/cover/couverture.jpg"} avatar={"./assets/avatar/riku.png"} />
            <div id="userpage-body">
                <div id="userpage-left">
                    <div id="userpage-info">
                        <h2 className="pseudo">Rikkun</h2>
                        <h3 className="login">@rikunanase</h3>
                    </div>
                    <UserMeters />
                    <div className="userpage-category">STATISTIQUES</div>
                    <div className="userpage-userstats">
                        <UserStatsWrapper />
                    </div>
                    <div className="userpage-category">VOTRE NEBULEUSE</div>
                    <div id="userpage-followed">
                        <User ami={"Mitsuki"} idAmi={2} img={"./assets/avatar/mitsuki.png"} date={"01 janvier 2000"} />
                        <User ami={"Mitsuki"} idAmi={2} img={"./assets/avatar/mitsuki.png"} date={"01 janvier 2000"} />
                        <User ami={"Mitsuki"} idAmi={2} img={"./assets/avatar/mitsuki.png"} date={"01 janvier 2000"} />
                    </div>
                    <div className="userpage-category">CONSTELLATIONS FAVORABLES</div>
                    <div id="userpage-followers">
                        <User ami={"Tamaki"} idAmi={2} img={"./assets/avatar/tamaki.png"} date={"01 janvier 2000"} />
                        <User ami={"Tamaki"} idAmi={2} img={"./assets/avatar/tamaki.png"} date={"01 janvier 2000"} />
                        <User ami={"Tamaki"} idAmi={2} img={"./assets/avatar/tamaki.png"} date={"01 janvier 2000"} />
                    </div>
                </div>
                <div id="userpage-right">
                    <div id="userpage-searchbar">
                        <Searchbar placeholder={"Naviguer dans votre constellation..."} type={ "messages" } />
                    </div>
                    <CreateMessage />
                    <div id="userpage-messageslist">
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
        </div>
    );
}

export default UserPage;