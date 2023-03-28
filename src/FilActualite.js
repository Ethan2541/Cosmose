import Menu from "./Menu.js";
import Message from "./Message.js";
import MessageACreer from "./MessageACreer.js";
import Recherche from "./Recherche.js";

import "./styles/fil-actualite.css";

function FilActualite(props){
    return(
        <div id="div-fil-actualite">
            <div id="fil-gauche">
                <Menu />
            </div>
            <div id="fil-droit">
                <div id="fil-droit1">
                    <Recherche />
                </div>
                <div id="fil-droit2">
                    <MessageACreer />
                </div>
                <div id="fil-droit3">
                    <Message idMessage={123} auteur={"Rikkun"} idAuteur={1} message={"Coucou les amis !"} idUtilisateur={1} date={"28 mars 2023 à 14h00"} />
                    <Message idMessage={123} auteur={"Mitsuki-kun"} idAuteur={1} message={"Ohayo mina-san !"} idUtilisateur={1} date={"28 mars 2023 à 14h00"} />
                    <Message idMessage={123} auteur={"Nagi-kun"} idAuteur={1} message={"Hello girls !"} idUtilisateur={1} date={"28 mars 2023 à 14h00"} />
                    <Message idMessage={123} auteur={"Yamato-kun"} idAuteur={1} message={"Yo tout le monde !"} idUtilisateur={1} date={"28 mars 2023 à 14h00"} />
                    <Message idMessage={123} auteur={"Tamaki-kun"} idAuteur={1} message={"Salut les amis..."} idUtilisateur={1} date={"28 mars 2023 à 14h00"} />
                    <Message idMessage={123} auteur={"Sogo-kun"} idAuteur={1} message={"Bonjour à tous !"} idUtilisateur={1} date={"28 mars 2023 à 14h00"} />
                    <Message idMessage={123} auteur={"Iori-kun"} idAuteur={1} message={"Bonjour les amis."} idUtilisateur={1} date={"28 mars 2023 à 14h00"} />
                </div>
            </div>
        </div>
    );
}

export default FilActualite;