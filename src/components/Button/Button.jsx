import "./Button.css"
import propTypes from "prop-types"

const Button = (props) =>  <button type={props.type}>{props.text}</button>

export default Button;

Button.propTypes = {
    type: propTypes.string,
    text: propTypes.string
}