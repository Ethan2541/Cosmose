import "./styles/userstats.css";

function UserStats(props) {
    return(
        <div id="userstats">
            <section>
                <div className="userstats-small-field userstats-white">
                    <p>{ props.friendsNumber }</p>
                </div>
                <div className="userstats-large-field userstats-bordercolor">
                    <p>constellations favorables</p>
                </div>
            </section>
            <section>
                <div className="userstats-small-field userstats-bordercolor">
                    <p>{ props.timeSpent }</p>
                </div>
                <div className="userstats-large-field userstats-white">
                    <p>à naviguer dans le Cosmos</p>
                </div>
            </section>
        </div>
    );
}

export default UserStats;