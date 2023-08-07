/* eslint-disable react/prop-types */
import "./Org.css";
import { useEffect } from "react";
import { useState } from "react";

export function OrgTitle(props) {
    const [enable, setEnable] = useState(false);

    
    useEffect(() => {
        if (!props.hiddenForm && !props.showForm || props.hiddenForm && props.showForm) {
            setEnable(false);
        } else {
            setEnable(true);
        }
    }, [props.hiddenForm, props.showForm]);

    const handleClick = () => {
        console.info("Se hizo click en el botón, estado: ", !props.showForm);
        props.setShowForm(!props.showForm);
    };

    return (
        <div className="Org componente">
            <h3>Mi Organización</h3>
            <button
                type="button"
                aria-label="toggle form"
                onClick={handleClick}
                disabled={!enable}
            ></button>
        </div>
    );
}
