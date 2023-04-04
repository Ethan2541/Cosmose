import { FaPalette } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useParams } from 'react-router-dom';

import Banner from '../components/Banner.js';
import CreateMessage from '../components/CreateMessage.js';
import Message from '../components/Messages/Message.js';
import Searchbar from '../components/Searchbar.js';
import User from '../components/Users/User.js';
import UserMeters from '../components/UserMeters.js';
import UserStatsWrapper from '../components/UserStats/UserStatsWrapper.js';

import './styles/userpage.css';

function UserPage(props) {
    const { login } = useParams();

    return (
        <div id='userpage'>
            <header>
                <Link to='accueil' id='userpage-title'><h1>COSMOSE</h1></Link>
                <Searchbar placeholder={'Rechercher des constellations...'} type={ 'users' } />
                <div id='userpage-parameters'>
                    <i><FaPalette title='Changer de thème' onClick={ props.switchTheme } /></i>
                    <i><FaSignOutAlt title='Se déconnecter' onClick={ props.logout } /></i>
                </div>
            </header>
            <Banner couverture={'/assets/cover/couverture.jpg'} avatar={'/assets/avatar/riku.png'} />
            <main id='userpage-body'>
                <aside id='userpage-left'>
                    <div id='userpage-info'>
                        <h2 className='pseudo'>Riku Nanase</h2>
                        <h3 className='login'>@rikkun</h3>
                    </div>
                    <UserMeters />
                    <div className='userpage-category'>STATISTIQUES</div>
                    <article className='userpage-userstats'>
                        <UserStatsWrapper />
                    </article>
                    <div className='userpage-category'>VOTRE NEBULEUSE</div>
                    <article id='userpage-followed'>
                        <User userLogin={'Mitsuki'} avatar={'/assets/avatar/mitsuki.png'} date={'01 janvier 2000'} />
                        <User userLogin={'Mitsuki'} avatar={'/assets/avatar/mitsuki.png'} date={'01 janvier 2000'} />
                        <User userLogin={'Mitsuki'} avatar={'/assets/avatar/mitsuki.png'} date={'01 janvier 2000'} />
                    </article>
                    <div className='userpage-category'>CONSTELLATIONS FAVORABLES</div>
                    <article id='userpage-followers'>
                        <User userLogin={'Tamaki'} avatar={'/assets/avatar/tamaki.png'} date={'01 janvier 2000'} />
                        <User userLogin={'Tamaki'} avatar={'/assets/avatar/tamaki.png'} date={'01 janvier 2000'} />
                        <User userLogin={'Tamaki'} avatar={'/assets/avatar/tamaki.png'} date={'01 janvier 2000'} />
                    </article>
                </aside>
                <section id='userpage-right'>
                    <div id='userpage-searchbar'>
                        <Searchbar placeholder={'Naviguer dans votre constellation...'} type={ 'usermessages' } />
                    </div>
                    <CreateMessage />
                    <div id='userpage-messageslist'>
                        <Message author={'Rikkun'} idAuteur={1} message={'Coucou les amis !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/riku.png'}/>
                        <Message author={'Mitsuki-kun'} idAuteur={2} message={'Ohayo ! Mina-san !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/mitsuki.png'}/>
                        <Message author={'Nagi-san'} idAuteur={3} message={'Hello girls !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/nagi.png'}/>
                        <Message author={'Yamato-san'} idAuteur={4} message={'Yo tout le monde !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/yamato.png'}/>
                        <Message author={'Tamaki-kun'} idAuteur={5} message={'Salut les amis...'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/tamaki.png'}/>
                        <Message author={'Sogo-san'} idAuteur={6} message={'Bonjour à tous !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/sogo.png'}/>
                        <Message author={'Iori-kun'} idAuteur={7} message={'Bonjour les amis.'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/iori.png'}/>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default UserPage;