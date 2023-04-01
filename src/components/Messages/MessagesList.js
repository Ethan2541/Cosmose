import Message from "./Message.js";

function MessagesList(props){
    return(
        messages.map((msg, index) => {<Message />})
    );
}

export default MessagesList;