import Spline from '@splinetool/react-spline';
import UserStats from './UserStats.js';

import './styles/userstatswrapper.css';

function UserStatsWrapper(props) {
    return(
        <div id='userstatswrapper'>
            <div id='userstatswrapper-scene'>
                <Spline scene='https://prod.spline.design/euzPYFXmtZr0LOP1/scene.splinecode' />
            </div>
            <div className='userstatswrapper-stats'>
                <UserStats friendsNumber={'500M'} timeSpent={'150h'}/>
            </div>
        </div>
    );
}

export default UserStatsWrapper;