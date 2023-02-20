import Ami from "./Ami";
import data from "./profil-test.json"

function Infos(props){
    <div>
        <p className='compteur'>{data.compteur}</p>
        <p className='abonne'>{data.stats.abonne}</p>
        <p className='abonnees'>{data.stats.abonnees}</p>
        <p className='like'>{data.stats.like}</p>
        {Data.amis.map()}
    </div>
}