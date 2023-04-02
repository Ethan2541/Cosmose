import User from "./User.js";

function UsersList(props) {
    return(
        props.users.map((user, index) => {<User />})
    );
}

export default UsersList;