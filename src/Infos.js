import Ami from './Ami';

import Data from './test.json'

function Infos(props){
    <div>
        <p className='compteur'>{Data.compteur}</p>
        <p className='abonne'>{Data.stats.abonne}</p>
        <p className='abonnees'>{Data.stats.abonnees}</p>
        <p className='like'>{Data.stats.like}</p>
        {Data.amis.map()}
    </div>
}