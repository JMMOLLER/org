import "./Form.css";
import PropTypes from "prop-types";
import shortid from "shortid";
import Team from "../Team/Team";
import Button from "../Button/Button";
import { InputText, InputSelect } from "../Input";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";
import { useReducer } from "react";

export default function Form(props) {
    const {
        showForm,
        teams,
        handleRegister,
        setShowModal,
        nodeOrgRef,
        generateBgColor,
        setDataTeams,
    } = props;
    const [showHelpersForm, setShowHelpersForm] = useState(true);
    const nodeRef = useRef(null);

    const handleExited = () => {
        nodeOrgRef.current.style = {};
    };

    const handleEntering = () => {
        nodeRef.current.classList.add("hidden");
    };

    return (
        <CSSTransition
            in={showForm}
            nodeRef={nodeRef}
            timeout={1000}
            classNames={"fade"}
            unmountOnExit
            onExited={handleExited}
            onEntering={handleEntering}
        >
            <section className="section_form" ref={nodeRef}>
                <FormHelpers
                    teams={teams}
                    handleRegister={handleRegister}
                    setShowModal={setShowModal}
                    nodeRef={nodeRef}
                    showHelpersForm={showHelpersForm}
                    setShowHelpersForm={setShowHelpersForm}
                />
                <FormTeams
                    generateBgColor={generateBgColor}
                    showHelpersForm={showHelpersForm}
                    setShowHelpersForm={setShowHelpersForm}
                    setDataTeams={setDataTeams}
                    setShowModal={setShowModal}
                />
            </section>
        </CSSTransition>
    );
}

const FormHelpers = (props) => {
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [photo, setPhoto] = useState("");
    const [team, setTeam] = useState("");
    const {
        teams,
        handleRegister,
        setShowModal,
        nodeRef: nodeRefSection,
        showHelpersForm,
        setShowHelpersForm,
    } = props;

    const nodeRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm({ name, position, photo, team })){
            return handleFormError();
        }
        const data = {
            id: shortid.generate(),
            name,
            position,
            photo,
            teamRef: team,
        };
        handleRegister(data);
        const teamToFocus = teams.find((t) => t.id === team);
        const id = setInterval(() => {
            const el = document.getElementById(teamToFocus.id);
            if(el){
                el.scrollIntoView({ behavior: "smooth"});
                clearInterval(id);
            }
        }, 1);
    };

    const validateForm = (formData) => {
        const { name, position, photo, team } = formData;
        if (name && position && photo && team) {
            return true;
        }
        return false;
    };

    const handleFormError = () => {
        const el = nodeRefSection.current;
        el.scrollIntoView({ behavior: "smooth" });
        setShowModal({
            show: true,
            payload: {
                message:
            "Parece que estás intentando enviar un formulario con datos vacíos, inténtalo otro día...",
                title: "⚠️ ¡Vaya, vaya..!",
            },
            easterEgg: true
        });
    };


    const handleEntering = () => {
        nodeRef.current.style.display = "none";
        setTimeout(() => {
            nodeRef.current.style = {};
        }, 1000);
    };

    return (
        <CSSTransition
            in={showHelpersForm}
            nodeRef={nodeRef}
            timeout={1000}
            classNames={"fade"}
            unmountOnExit
            onEntering={handleEntering}
        >
            <form onSubmit={handleFormSubmit} id="form_helper" ref={nodeRef}>
                <h2 className="form_title">
                    Rellena el formulario para añadir un colaborador
                </h2>
                <button
                    className="toggle_form"
                    type="button"
                    title="alternar formulario"
                    onClick={() => setShowHelpersForm(!showHelpersForm)}
                ></button>
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
                <Button type="submit" text="Añadir Colaborador" />
            </form>
        </CSSTransition>
    );
};

const FormTeams = ({ generateBgColor, showHelpersForm, setShowHelpersForm, setDataTeams, setShowModal }) => {
    const [newTeam, setNewTeam] = useState("");
    const [newTeamColor, setNewTeamColor] = useState("#05c2b5");
    const nodeRef = useRef(null);
    const newDataTeam = {
        id: shortid.generate(),
        teamName: newTeam,
        colors: {
            primary: newTeamColor,
            background: generateBgColor(newTeamColor),
        },
    }
    const helperPreview = [
        {
            id: "0",
            name: "Tu Nombre",
            position: "Esta es una tarjeta de ejemplo",
            photo: "https://img.icons8.com/?size=256&id=108652&format=png",
            team: "Front End",
        },
    ]

    const handleFormSubmit = (e) => {
        e.preventDefault();
        setShowModal({
            show: true,
            payload: {
                title: "✅ ¡Equipo creado!",
                message: "Ahora puedes añadir colaboradores a tu nuevo equipo.",
            }
        });
        setDataTeams((prev) => [...prev, newDataTeam]);
        handleCleanForm();
    };

    const handleCleanForm = () => {
        setNewTeam("");
        setNewTeamColor("#05c2b5");
    }

    const handleEntering = () => {
        nodeRef.current.style.display = "none";
        setTimeout(() => {
            nodeRef.current.style = {};
        }, 1000);
    };

    return (
        <CSSTransition
            in={!showHelpersForm}
            nodeRef={nodeRef}
            timeout={1000}
            classNames={"fade"}
            unmountOnExit
            onEntering={handleEntering}
        >
            <form onSubmit={handleFormSubmit} id="form_team" ref={nodeRef}>
                <h2 className="form_title">
                    Rellena el formulario para añadir un nuevo equipo
                </h2>
                <button
                    className="toggle_form"
                    type="button"
                    title="alternar formulario"
                    onClick={() => setShowHelpersForm(!showHelpersForm)}
                ></button>
                <InputText
                    type="text"
                    name="team_name"
                    id="team_name"
                    placeholder="Ingrese el nombre de su equipo"
                    text="Nombre del equipo"
                    value={newTeam}
                    setValue={setNewTeam}
                    isRequired={true}
                />
                <InputText
                    type="color"
                    name="team_color"
                    id="team_color"
                    placeholder="Seleccione el color"
                    text="Color destacado"
                    value={newTeamColor}
                    setValue={setNewTeamColor}
                    isRequired={true}
                />
                <Team
                    dataTeam={newDataTeam}
                    helpers={helperPreview}
                    deleteHelper={() => window.alert("no puedes eliminar una tarjeta de ejemplo")}
                    changeTeamColor={() => window.alert("mejor usa el otro campo de tipo color...")}
                    isPreview={true}
                />
                <Button type="submit" text="Crear Equipo" />
            </form>
        </CSSTransition>
    );
};

Form.propTypes = {
    showForm: PropTypes.bool.isRequired,
    teams: PropTypes.array.isRequired,
    handleRegister: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    nodeOrgRef: PropTypes.object.isRequired,
    generateBgColor: PropTypes.func.isRequired,
    setDataTeams: PropTypes.func.isRequired,
};

FormHelpers.propTypes = {
    teams: PropTypes.array.isRequired,
    handleRegister: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    nodeRef: PropTypes.object.isRequired,
    showHelpersForm: PropTypes.bool.isRequired,
    setShowHelpersForm: PropTypes.func.isRequired,
};

FormTeams.propTypes = {
    generateBgColor: PropTypes.func.isRequired,
    showHelpersForm: PropTypes.bool.isRequired,
    setShowHelpersForm: PropTypes.func.isRequired,
    setDataTeams: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
};
