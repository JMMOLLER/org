import "./Team.css"
import Card from "../Card/Card"

import PropTypes from 'prop-types';
import "./Team.css"

export default function Team({ dataTeams }) {

    const urlImg = "https://avatars.githubusercontent.com/u/86493703?v=4"

    console.log("Teams: ",dataTeams)

    return (
        <section className="section_card_content" style={{backgroundColor: dataTeams.colors?.background }} >
            <div className="title_section">
                <h2 style={{borderBottom: `4px solid ${dataTeams.colors?.primary}`}}>{dataTeams.teamName ?? "unknown"}</h2>
            </div>
            <Card bgColor={dataTeams.colors?.primary} img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card bgColor={dataTeams.colors?.primary} img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card bgColor={dataTeams.colors?.primary} img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card bgColor={dataTeams.colors?.primary} img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card bgColor={dataTeams.colors?.primary} img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
        </section>
    )
}

Team.propTypes = {
    dataTeams: PropTypes.object.isRequired,
};
