import "./Card.css";

import PropTypes from 'prop-types';
export default function Card({ dataHelper, bgColor }) {
    return (
        <div className="Card">
            <div className="header_card" style={{backgroundColor: bgColor}}>
                <img src={dataHelper.photo} alt={"image profile"} />
            </div>
            <div className="content_card">
                <h3>{dataHelper.name}</h3>
                <p>{dataHelper.position}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    dataHelper: PropTypes.object.isRequired,
    bgColor: PropTypes.string.isRequired
};

