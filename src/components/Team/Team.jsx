import "./Team.css";
import Card from "../Card/Card";

import PropTypes from "prop-types";
import "./Team.css";

export default function Team({ dataTeams, helpers }) {
    // const urlImg = "https://avatars.githubusercontent.com/u/86493703?v=4"

    return (
        <>
            {helpers.length > 0 && (
                <section
                    className="section_card_content"
                    style={{ backgroundColor: dataTeams.colors?.background }}
                >
                    <div className="title_section">
                        <h2
                            style={{
                                borderBottom: `4px solid ${dataTeams.colors?.primary}`,
                            }}
                        >
                            {dataTeams.teamName ?? "unknown"}
                        </h2>
                    </div>
                    {helpers.map((helper, index) => (
                        <Card
                            key={index}
                            bgColor={dataTeams.colors?.primary}
                            dataHelper={helper}
                        />
                    ))}
                </section>
            )}
        </>
    );
}

Team.propTypes = {
    dataTeams: PropTypes.object.isRequired,
    helpers: PropTypes.array.isRequired,
};
