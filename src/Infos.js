import Stats from "./Stats.js";

import "./styles/infos.css";

function Infos(props) {
    return(
        <aside className="profil-infos">
            <div className="infos-stats">
                <Stats nbAmis={"500M"} tempsPasse={"150h"}/>
            </div>
        </aside>
    );
}

export default Infos;