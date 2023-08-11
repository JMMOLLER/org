import "./Modal.css";

import PropTypes from 'prop-types';

export default function Modal({ setShowModal }) {

    const handleClick = () => {
        setShowModal(false);
    };

    return (
        <div className="modal_container">
            <div className="modal">
                <div className="title_modal">
                    <h3>Mala Operación</h3>
                </div>
                <hr />
                <div className="content_modal">
                    <p className="text">
                        Parece que estás intentando enviar un formulario con
                        datos vacíos, inténtalo otro día...
                    </p>
                    <img
                        src="https://media.tenor.com/KUUtQs-OOHAAAAAM/rana-que-salta-meme-meme-rana.gif"
                        style={{ width: "50px", height: "50px" }}
                        alt="mockup image"
                    />
                </div>
                <hr />
                <div className="options_modal">
                    <button
                        type="button"
                        className="btn_modal"
                        onClick={handleClick}
                    >
                        Entiendo
                    </button>
                </div>
            </div>
        </div>
    );
}

Modal.propTypes = {
    setShowModal: PropTypes.func.isRequired,
    rootHeight: PropTypes.number.isRequired
};
