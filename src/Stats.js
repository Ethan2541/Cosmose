import "./styles/stats.css";

function Stats(props) {
    return(
        <div className="profil-stats">
            <section className="profil-stat-indiv">
                <div className="stats-petit stats-blanc">
                    <p>{props.nbAmis}</p>
                </div>
                <div className="stats-large stats-violet">
                    <p>constellations favorables</p>
                </div>
            </section>
            <section className="profil-stat-indiv">
                <div className="stats-petit stats-violet">
                    <p>{props.tempsPasse}</p>
                </div>
                <div className="stats-large stats-blanc">
                    <p>à naviguer dans le Cosmos</p>
                </div>
            </section>
        </div>
    );
}

export default Stats;