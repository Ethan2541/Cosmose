import Message from './Message';
import messages from './messages.json';

function ListeMessages(props){
    return(
        messages.map((msg, index) => {<Message message={msg.message} auteur={msg.auteur} auteur_id={msg.auteur_id} message_id={msg.id} />})
    );
}

export default ListeMessages;