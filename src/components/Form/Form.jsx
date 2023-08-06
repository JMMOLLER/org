/* eslint-disable react/prop-types */
import "./Form.css"
import Button from "../Button/Button"
import { InputText, InputSelect } from "../InputComponents"

export default function Form({ showForm }) {

    const teams = ["Programación", "Front End", "Data Science", "Devops", "UX y Diseño", "Móvil", "Innovación y Gestión"]

    return (
        <form className={!showForm ? "close" : ""} action="">
            <h2 className="form_title">Rellena el formulario para añadir un colaborador</h2>

            <InputText type="text" name="name" id="name" placeholder="Ingrese el nombre" text="Nombre" isRequired={true} />
            <InputText type="text" name="position" id="position" placeholder="Ingrese el puesto" text="Puesto" isRequired={true} />
            <InputText type="url" name="photo" id="photo" placeholder="Ingrese la url de la foto" text="Foto" isRequired={true} />
            <InputSelect name="team" id="team" text="Equipo" isRequired={true} optionsTeams={teams} />
            <Button type="submit" text="Crear" />
        </form>
    )
}