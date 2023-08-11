/* eslint-disable react/prop-types */
import "./InputComponents.css";
import { useState } from "react";

// type props {
//     id: String,
//     text: String,
//     name: String,
//     type: String,
//     isRequired: Boolean,
//     placeholder: String,
//     optionsTeams: Array,
//     value: String,
//     setValue: Function
// }

export function InputText(props /*: props*/) {
    try {
        const response = validateInputTextProps(props);

        if (!response.isValid) throw new Error(response.msg);

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
                    value={props.value}
                    required={props.isRequired}
                />
            </div>
        );
    } catch (err) {
        console.warn(err);
        return null;
    }
}

export function InputSelect(props /*:  props*/) {
    const [active, setActive] = useState(false);

    try {
        const response = validateInputSelectProps(props);

        if (!response.isValid) throw new Error(response.msg);

        const handleInputSelectChange = (e) => {
            // Prevents selecting the default option.
            if (active && e.target.selectedIndex === 0)
                e.target.selectedIndex = props.value;
            else if (e.target.selectedIndex !== 0) {
                e.target.dataset.default = false;
                props.setValue(e.target.value);
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
                        <option key={index} value={team.teamName}>
                            {team.teamName}
                        </option>
                    )}
                </select>
            </div>
        );
    } catch (err) {
        console.warn(err);
        return null;
    }
}

function validateInputTextProps(props /*: props*/) {
    const response = {
        isValid: false,
        msg: "",
    };

    if (!props.id) response.msg = "Field 'id' is missing.";
    else if (!props.name) response.msg = "Field 'name' is missing.";
    else if (!props.text) response.msg = "Field 'text' is missing.";
    else if (!props.type) response.msg = "Field 'type' is missing.";
    else if (!props.placeholder)
        response.msg = "Field 'placeholder' is missing.";
    else response.isValid = true;

    return response;
}

function validateInputSelectProps(props /*: props*/) {
    const response = {
        isValid: false,
        msg: "",
    };

    if (!props.id) response.msg = "Field 'id' is missing.";
    else if (!props.name) response.msg = "Field 'name' is missing.";
    else if (!props.text) response.msg = "Field 'text' is missing.";
    else if (!Array.isArray(props.optionsTeams))
        response.msg = "Field 'optionsTeams' must be an Array.";
    else response.isValid = true;

    return response;
}
