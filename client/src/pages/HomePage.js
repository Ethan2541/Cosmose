import axios from '../axios.js';
import CreateMessage from '../components/CreateMessage.js';
import Menu from '../components/Menu.js';
import MessagesList from '../components/Messages/MessagesList.js';
import Searchbar from '../components/Searchbar.js';
import StarryBackground from '../components/StarryBackground.js';

import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import './styles/homepage.css';

function HomePage(props) {
    // States
    const [retweet, setRetweet] = useState(null);
    const [messagesList, setMessagesList] = useState(null);
    const location = useLocation();
    

    // Useful functions
    function getMessagesList() {
        axios.get('/messages')
            .then(res => {
                let messages = res.data.messagesList;
                setMessagesList(messages);
            })
            .catch(err => console.log('Could not get the global list of messages'));
    }


    // Get the list of messages
    useEffect(() => {
        const updatedMessagesList = getMessagesList();
        setMessagesList(updatedMessagesList);
    }, [location]);


    return(
        <div id='homepage'>
            <div id='homepage-starrybackground'>
                <StarryBackground />
            </div>
            <aside id='homepage-left'> 
                <Menu switchTheme={ props.switchTheme } logout={ props.logout } setList={ setMessagesList } />
            </aside>
            <main id='homepage-right'>
                <div id='homepage-searchbar'>
                    <Searchbar placeholder={ 'Naviguer dans le Cosmos...' } type={ 'allmessages' } setList={ setMessagesList } />
                </div>
                <section id='homepage-posts'>
                    <CreateMessage getMessagesList={ getMessagesList } retweet={ retweet } setRetweet={ setRetweet } />
                    <div id='homepage-messageslist'>
                        <MessagesList messages={ messagesList } currentUserLogin={ props.currentUser.login } getList={ getMessagesList } setRetweet={ setRetweet } />
                    </div>
                </section>
            </main>
        </div>
    );
}

export default HomePage;