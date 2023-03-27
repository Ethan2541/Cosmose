import "./styles/messageacreer.css";

function MessageACreer(props){
    return(
        <div id="message-a-publier">
            <textarea id="publication" maxlength={280} placeholder="Nouveau message... (jusqu'à 280 caractères)"></textarea>
            <button type="submit">PUBLIER</button>
        </div>
    );
}

export default MessageACreer;