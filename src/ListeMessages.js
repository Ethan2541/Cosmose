import Message from "./Message";
import messages from "./message-test.json";

function ListeMessages(props){
    return(
        messages.map((msg, index) => {<Message idAuteur={msg.idAuteur} auteur={msg.auteur} idMessage={msg.id} message={msg.message} date={msg.date} />})
    );
}

export default ListeMessages;