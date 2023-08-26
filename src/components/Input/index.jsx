import "./Input.css";
import { useState } from "react";
import propTypes from "prop-types";

export function InputText(props) {
    const handleChnage = (e) => {
        props.setValue(e.target.value);
    };

    return (
        <div className="container_group_form">
            <label htmlFor={props.id}>{props.text}</label>
            <input
                type={props.type}
                placeholder={props.placeholder}
                name={props.name}
                id={props.id}
                onChange={handleChnage}
                autoComplete="off"
                value={props.value}
                required={props.isRequired}
            />
        </div>
    );
}

export function InputSelect(props) {
    const [active, setActive] = useState(false);

    const handleInputSelectChange = (e) => {
        // Prevents selecting the default option.
        if (active && e.target.selectedIndex === 0)
            e.target.selectedIndex = props.value;
        else if (e.target.selectedIndex !== 0) {
            e.target.dataset.default = false;
            const selectedOption = props.optionsTeams.find(team => team.id === e.target.value)
            props.setValue(selectedOption.id);
            setActive(true);
        }
    };

    return (
        <div className="container_group_form">
            <label htmlFor={props.id}>{props.text}</label>
            <select
                name={props.name}
                id={props.id}
                data-default={true}
                required={props.isRequired}
                onChange={handleInputSelectChange}
                value={props.value}
            >
                <option value="" disabled={active}>
                    Seleccionar equipo
                </option>
                {props.optionsTeams.map((team, index) => 
                    <option key={index} value={team.id}>
                        {team.teamName}
                    </option>
                )}
            </select>
        </div>
    );
}

InputText.propTypes = {
    text: propTypes.string.isRequired,
    type: propTypes.string.isRequired,
    placeholder: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    setValue: propTypes.func.isRequired,
    isRequired: propTypes.bool.isRequired,
};

InputSelect.propTypes = {
    text: propTypes.string.isRequired,
    name: propTypes.string.isRequired,
    id: propTypes.string.isRequired,
    value: propTypes.string.isRequired,
    setValue: propTypes.func.isRequired,
    isRequired: propTypes.bool.isRequired,
    optionsTeams: propTypes.array.isRequired,
};