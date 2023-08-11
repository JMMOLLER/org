import "./Card.css";

import PropTypes from 'prop-types';
export default function Card(props) {
    return (
        <div className="Card">
            <div className="header_card" style={{backgroundColor: props.bgColor}}>
                <img src={props.img} alt={"image profile"} />
            </div>
            <div className="content_card">
                <h3>{props.fullName}</h3>
                <p>{props.position}</p>
            </div>
        </div>
    );
}

Card.propTypes = {
    bgColor: PropTypes.string.isRequired,
    img: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    position: PropTypes.string.isRequired
};

