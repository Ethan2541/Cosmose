import "./styles/ami.css";

function Ami(props) {
    return(
        <article id={props.idAmi} className="ami">
            <img src={props.img} alt={"Avatar de " + props.ami} />
            <div className="meta-ami">
                <h3>{props.ami}</h3>
                <h4>Amis depuis le {props.date}</h4>
            </div>
        </article>
    );
}

export default Ami;