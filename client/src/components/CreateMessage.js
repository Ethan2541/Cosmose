import "./styles/createmessage.css";

function CreateMessage(props){
    return(
        <div id="createmessage">
            <textarea maxLength={ 280 } placeholder="Nouveau message... (jusqu'à 280 caractères)"></textarea>
            <button type="submit">PUBLIER</button>
        </div>
    );
}

export default CreateMessage;