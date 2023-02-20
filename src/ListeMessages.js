import Message from "./Message";
import messages from "./message-test.json";

function ListeMessages(props){
    return(
        messages.map((msg, index) => {<Message auteur_id={msg.auteur_id} auteur={msg.auteur} message_id={msg.id} message={msg.message} />})
    );
}

export default ListeMessages;