import Spline from '@splinetool/react-spline';

import "./styles/maquette.css";

function Maquette(props) {
    return(
        <div className="maquette">
            <Spline className="infos-maquette" scene="https://prod.spline.design/euzPYFXmtZr0LOP1/scene.splinecode" />
        </div>
    );
}

export default Maquette;