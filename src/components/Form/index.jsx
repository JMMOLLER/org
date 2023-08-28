import "./Form.css";
import PropTypes from "prop-types";
import shortid from "shortid";
import Team from "../Team/Team";
import { InputText, InputSelect } from "../Input";
import { CSSTransition } from "react-transition-group";
import { useState, useRef } from "react";

export default function Form(props) {
    const {
        showForm,
        teams,
        handleRegister,
        setShowModal,
        nodeOrgRef,
        generateBgColor,
        setDataTeams,
        t,
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
                    t={t}
                />
                <FormTeams
                    generateBgColor={generateBgColor}
                    showHelpersForm={showHelpersForm}
                    setShowHelpersForm={setShowHelpersForm}
                    setDataTeams={setDataTeams}
                    setShowModal={setShowModal}
                    t={t}
                />
            </section>
        </CSSTransition>
    );
}

const FormHelpers = (props) => {
    const {
        teams,
        handleRegister,
        setShowModal,
        nodeRef: nodeRefSection,
        showHelpersForm,
        setShowHelpersForm,
        t,
    } = props;
    const [name, setName] = useState("");
    const [position, setPosition] = useState("");
    const [photo, setPhoto] = useState("");
    const [team, setTeam] = useState("");

    const nodeRef = useRef(null);

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm({ name, position, photo, team })) {
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
            if (el) {
                el.scrollIntoView({ behavior: "smooth" });
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
                title: t("modal.title.text_1"),
                message: t("modal.message.text_1"),
                button: t("modal.button"),
            },
            easterEgg: true,
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
                <h2 className="form_title">{t("form_helpers.title")}</h2>
                <button
                    className="toggle_form"
                    type="button"
                    title={t("form_helpers.toggle_form")}
                    onClick={() => setShowHelpersForm(!showHelpersForm)}
                ></button>
                <InputText
                    type="text"
                    name="name"
                    id="name"
                    placeholder={t("form_helpers.input.name.placeholder")}
                    text={t("form_helpers.input.name.label")}
                    value={name}
                    setValue={setName}
                    isRequired={true}
                />
                <InputText
                    type="text"
                    name="position"
                    id="position"
                    placeholder={t("form_helpers.input.position.placeholder")}
                    text={t("form_helpers.input.position.label")}
                    value={position}
                    setValue={setPosition}
                    isRequired={true}
                />
                <InputText
                    type="url"
                    name="photo"
                    id="photo"
                    placeholder={t("form_helpers.input.photo.placeholder")}
                    text={t("form_helpers.input.photo.label")}
                    value={photo}
                    setValue={setPhoto}
                    isRequired={true}
                />
                <InputSelect
                    name="team"
                    id="team"
                    text={t("form_helpers.input.team.label")}
                    isRequired={true}
                    value={team}
                    setValue={setTeam}
                    optionsTeams={teams}
                    t={t}
                />
                <button type="submit" title={t("form_helpers.button.alt")}>
                    {t("form_helpers.button.value")}
                </button>
            </form>
        </CSSTransition>
    );
};

const FormTeams = ({
    generateBgColor,
    showHelpersForm,
    setShowHelpersForm,
    setDataTeams,
    setShowModal,
    t,
}) => {
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
    };
    const helperPreview = [
        {
            id: "0",
            name: t("form_teams.preview.name"),
            position: t("form_teams.preview.position"),
            photo: "https://img.icons8.com/?size=256&id=108652&format=png",
            team: newTeam,
        },
    ];

    const handleFormSubmit = (e) => {
        e.preventDefault();
        if (!validateForm({ newTeam, newTeamColor })) {
            return handleFormError();
        }
        setShowModal({
            show: true,
            payload: {
                title: t("modal.title.text_2"),
                message: t("modal.message.text_2"),
                button: t("modal.button"),
            },
        });
        setDataTeams((prev) => [...prev, newDataTeam]);
        handleCleanForm();
    };

    const validateForm = (formData) => {
        const { newTeam, newTeamColor } = formData;
        if (newTeam && newTeamColor) {
            return true;
        }
        return false;
    }

    const handleFormError = () => {
        const el = nodeRef.current;
        el.scrollIntoView({ behavior: "smooth" });
        setShowModal({
            show: true,
            payload: {
                title: t("modal.title.text_1"),
                message: t("modal.message.text_1"),
                button: t("modal.button"),
            },
            easterEgg: true,
        });
    };

    const handleCleanForm = () => {
        setNewTeam("");
        setNewTeamColor("#05c2b5");
    };

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
                {t("form_teams.title")}
                </h2>
                <button
                    className="toggle_form"
                    type="button"
                    title={t("form_helpers.toggle_form")}
                    onClick={() => setShowHelpersForm(!showHelpersForm)}
                ></button>
                <InputText
                    type="text"
                    name="team_name"
                    id="team_name"
                    placeholder={t("form_teams.input.name.placeholder")}
                    text={t("form_teams.input.name.label")}
                    value={newTeam}
                    setValue={setNewTeam}
                    isRequired={true}
                />
                <InputText
                    type="color"
                    name="team_color"
                    id="team_color"
                    placeholder={t("form_teams.input.color.placeholder")}
                    text={t("form_teams.input.color.label")}
                    value={newTeamColor}
                    setValue={setNewTeamColor}
                    isRequired={true}
                />
                <Team
                    dataTeam={newDataTeam}
                    helpers={helperPreview}
                    deleteHelper={() => null}
                    changeTeamColor={() => null}
                    isPreview={true}
                    t={t}
                />
                <button type="submit" title={t("form_teams.button.alt")}>
                    {t("form_teams.button.value")}
                </button>
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
    t: PropTypes.func.isRequired,
};

FormHelpers.propTypes = {
    teams: PropTypes.array.isRequired,
    handleRegister: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    nodeRef: PropTypes.object.isRequired,
    showHelpersForm: PropTypes.bool.isRequired,
    setShowHelpersForm: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};

FormTeams.propTypes = {
    generateBgColor: PropTypes.func.isRequired,
    showHelpersForm: PropTypes.bool.isRequired,
    setShowHelpersForm: PropTypes.func.isRequired,
    setDataTeams: PropTypes.func.isRequired,
    setShowModal: PropTypes.func.isRequired,
    t: PropTypes.func.isRequired,
};
