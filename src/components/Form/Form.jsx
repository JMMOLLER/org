/* eslint-disable react/prop-types */
import "./Form.css";
import Button from "../Button/Button";
import { InputText, InputSelect } from "../InputComponents";
import { useState } from "react";
import { useSpring, animated } from "@react-spring/web";
import { useEffect } from "react";
import { useRef } from "react";

export default function Form({ showForm, teams, handleRegister, setShowModal }) {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [photo, setPhoto] = useState("");
    const [team, setTeam] = useState("");
    const [isAnimating, setIsAnimating] = useState(false);
    const section = useRef(null);

    const springs = useSpring({
        to: { opacity: isAnimating ? 1 : 0 },
    });

    useEffect(() => {
        setIsAnimating(showForm);
    }, [showForm]);

    const validateForm = (formData) => {
        const { name, position, photo, team } = formData;
        if (name && position && photo && team) {
            return true;
        }
        return false;
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm({ name, position, photo, team })) return handleFormError();
        const data = {
            name,
            position,
            photo,
            team,
        };
        handleRegister(data);
    };

    const handleFormError = () => {
        const el = section.current;
        el.scrollIntoView({ behavior: "smooth" });
        setShowModal(true);
    };

    return (
        <animated.section className="section_form" style={springs} ref={section}>
            <form onSubmit={handleFormSubmit}>
                <h2 className="form_title">
                    Rellena el formulario para añadir un colaborador
                </h2>
                <InputText
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Ingrese el nombre"
                    text="Nombre"
                    value={name}
                    setValue={setName}
                    isRequired={true}
                />
                <InputText
                    type="text"
                    name="position"
                    id="position"
                    placeholder="Ingrese el puesto"
                    text="Puesto"
                    value={position}
                    setValue={setPosition}
                    isRequired={true}
                />
                <InputText
                    type="url"
                    name="photo"
                    id="photo"
                    placeholder="Ingrese la url de la foto"
                    text="Foto"
                    value={photo}
                    setValue={setPhoto}
                    isRequired={true}
                />
                <InputSelect
                    name="team"
                    id="team"
                    text="Equipo"
                    isRequired={true}
                    value={team}
                    setValue={setTeam}
                    optionsTeams={teams}
                />
                <Button type="submit" text="Crear" />
            </form>
        </animated.section>
    );
}
