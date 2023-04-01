import { Spline } from '@splinetool/react-spline';
import { UserStats } from "./UserStats.js";

import "./styles/statswrapper.css";

function StatsWrapper(props) {
    return(
        <div id="statswrapper">
            <div id="statswrapper-scene">
                <Spline scene="https://prod.spline.design/euzPYFXmtZr0LOP1/scene.splinecode" />
            </div>
            <div className="statswrapper-stats">
                <UserStats friendsNumber={"500M"} timeSpent={"150h"}/>
            </div>
        </div>
    );
}

export default StatsWrapper;