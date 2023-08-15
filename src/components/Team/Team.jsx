import "./Team.css";
import Card from "../Card/Card";

import PropTypes from "prop-types";

export default function Team({ dataTeam, helpers, deleteHelper, changeTeamColor, isPreview }) {
    // const urlImg = "https://avatars.githubusercontent.com/u/86493703?v=4";

    const handleChangeColor = (e) => {
        if(isPreview) return changeTeamColor(e.target.value)
        changeTeamColor(dataTeam.id, e.target.value);
    }

    return (
        <>
            {helpers.length > 0 && (
                <section
                    className="section_card_content"
                    style={{ backgroundColor: dataTeam.colors?.background }}
                >
                    <input type="color" title="Cambiar color del equipo" className="color-picker" value={dataTeam.colors.primary} onChange={handleChangeColor} />
                    <div className="title_section">
                        <h2
                            style={{
                                borderBottom: `4px solid ${dataTeam.colors?.primary}`,
                            }}
                        >
                            {dataTeam.teamName ?? "unknown"}
                        </h2>
                    </div>
                    {helpers.map((helper, index) => (
                        <Card
                            key={index}
                            bgColor={dataTeam.colors?.primary}
                            dataHelper={helper}
                            deleteHelper={deleteHelper}
                        />
                    ))}
                </section>
            )}
        </>
    );
}

Team.propTypes = {
    dataTeam: PropTypes.object.isRequired,
    helpers: PropTypes.array.isRequired,
    deleteHelper: PropTypes.func.isRequired,
    changeTeamColor: PropTypes.func.isRequired,
    isPreview: PropTypes.bool,
};
