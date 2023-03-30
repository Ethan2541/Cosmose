import Spline from '@splinetool/react-spline';
import Stats from "./Stats.js";

import "./styles/infos.css";

function Infos(props) {
    return(
        <aside className="infos">
            <div className="infos-maquette">
                <Spline className="infos-maquette" scene="https://prod.spline.design/euzPYFXmtZr0LOP1/scene.splinecode" />
            </div>
            <div className="infos-stats">
                <Stats nbAmis={"500M"} tempsPasse={"150h"}/>
            </div>
        </aside>
    );
}

export default Infos;