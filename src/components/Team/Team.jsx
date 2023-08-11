import "./Team.css"
import Card from "../Card/Card"

import PropTypes from 'prop-types';
import "./Team.css"

export default function Team({ dataTeams, helper }) {

    // const urlImg = "https://avatars.githubusercontent.com/u/86493703?v=4"

    console.log(dataTeams)
    console.log(helper)

    return (
        <section className="section_card_content" style={{backgroundColor: dataTeams.colors?.background }} >
            <div className="title_section">
                <h2 style={{borderBottom: `4px solid ${dataTeams.colors?.primary}`}}>{helper.team ?? "unknown"}</h2>
            </div>
            <Card bgColor={dataTeams.colors?.primary} img={helper.photo} fullName={helper.name} position={helper.position} />
        </section>
    )
}

Team.propTypes = {
    dataTeams: PropTypes.object.isRequired,
};
