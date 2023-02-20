function Message(props){
    return(
        <div className="post">
            <h4 id={props.auteur_id}>{props.auteur}</h4>
            <p id={props.message_id}>{props.message}</p>
        </div>
    );
}

export default Message;