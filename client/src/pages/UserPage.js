import { FaPalette } from 'react-icons/fa';
import { FaSignOutAlt } from 'react-icons/fa';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

import axios from '../axios.js';
import Banner from '../components/Banner.js';
import CreateMessage from '../components/CreateMessage.js';
import Message from '../components/Messages/Message.js';
import Searchbar from '../components/Searchbar.js';
import User from '../components/Users/User.js';
import UserMeters from '../components/UserMeters.js';
import UserStatsWrapper from '../components/UserStats/UserStatsWrapper.js';

import './styles/userpage.css';

function UserPage(props) {
    const location = useLocation();
    const navigate = useNavigate();
    const { login } = useParams();
    const [user, setUser] = useState(props.currentUser);

    useEffect(() => {
        if (!login) {
            setUser(props.currentUser);
        }
        axios.get(`/users/${login}`)
            .then(res => {
                if (!res.data.user) {
                    navigate('/profil');
                }
                else {
                    setUser(res.data.user);
                }
            })
            .catch(err => console.log(err));
    }, [login]);

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
            <Banner couverture={'/assets/cover/couverture.jpg'} avatar={'/assets/avatar/riku.png'} currentUser={ props.currentUser } user={ user } />
            <main id='userpage-body'>
                <aside id='userpage-left'>
                    <div id='userpage-info'>
                        <h2 className='pseudo'>{user.firstName} {user.lastName}</h2>
                        <h3 className='login'>@{user.login}</h3>
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
                        <Message author={'Rikkun'} message={'Coucou les amis !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/riku.png'}/>
                        <Message author={'Mitsuki-kun'} message={'Ohayo ! Mina-san !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/mitsuki.png'}/>
                        <Message author={'Nagi-san'} message={'Hello girls !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/nagi.png'}/>
                        <Message author={'Yamato-san'} message={'Yo tout le monde !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/yamato.png'}/>
                        <Message author={'Tamaki-kun'} message={'Salut les amis...'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/tamaki.png'}/>
                        <Message author={'Sogo-san'} message={'Bonjour à tous !'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/sogo.png'}/>
                        <Message author={'Iori-kun'} message={'Bonjour les amis.'} date={'28 mars 2023 à 14h00'} avatar={'/assets/avatar/iori.png'}/>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default UserPage;