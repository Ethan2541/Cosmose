import CreateMessage from '../components/CreateMessage.js';
import Menu from '../components/Menu.js';
import Message from '../components/Messages/Message.js';
import Searchbar from '../components/Searchbar.js';
import StarryBackground from '../components/StarryBackground.js';

import './styles/homepage.css';

function HomePage(props) {
    return(
        <div id='homepage'>
            <div id='homepage-starrybackground'>
                <StarryBackground />
            </div>
            <aside id='homepage-left'> 
                <Menu switchTheme={ props.switchTheme } logout={ props.logout } />
            </aside>
            <main id='homepage-right'>
                <div id='homepage-searchbar'>
                    <Searchbar  placeholder={ 'Naviguer dans le Cosmos...' } type={ 'allmessages' } />
                </div>
                <section id='homepage-posts'>
                    <CreateMessage />
                    <div id='homepage-messageslist'>
                    <Message author={'Rikkun'} idAuteur={1} message={'Coucou les amis !'} date={'28 mars 2023 à 14h00'} avatar={'./assets/avatar/riku.png'}/>
                        <Message author={'Mitsuki-kun'} idAuteur={2} message={'Ohayo ! Mina-san !'} date={'28 mars 2023 à 14h00'} avatar={'./assets/avatar/mitsuki.png'}/>
                        <Message author={'Nagi-san'} idAuteur={3} message={'Hello girls !'} date={'28 mars 2023 à 14h00'} avatar={'./assets/avatar/nagi.png'}/>
                        <Message author={'Yamato-san'} idAuteur={4} message={'Yo tout le monde !'} date={'28 mars 2023 à 14h00'} avatar={'./assets/avatar/yamato.png'}/>
                        <Message author={'Tamaki-kun'} idAuteur={5} message={'Salut les amis...'} date={'28 mars 2023 à 14h00'} avatar={'./assets/avatar/tamaki.png'}/>
                        <Message author={'Sogo-san'} idAuteur={6} message={'Bonjour à tous !'} date={'28 mars 2023 à 14h00'} avatar={'./assets/avatar/sogo.png'}/>
                        <Message author={'Iori-kun'} idAuteur={7} message={'Bonjour les amis.'} date={'28 mars 2023 à 14h00'} avatar={'./assets/avatar/iori.png'}/>
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;