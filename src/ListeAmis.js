import Ami from "./Ami.js";
import amis from "./profil-test.json";

function ListeAmis(props) {
    return(
        amis.map((ami, index) => {<Ami />})
    );
}

export default ListeAmis;