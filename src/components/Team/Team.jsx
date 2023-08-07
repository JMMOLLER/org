import Section from "../Section"
import Card from "../Card/Card"

export default function Team() {

    const urlImg = "https://avatars.githubusercontent.com/u/86493703?v=4"

    return (
        <Section className="section_card_content programming" >
            <div className="title_section">
                <h2>Programación</h2>
            </div>
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
            <Card img={urlImg} fullName={"Jorge Luis Moreno"} position={"Desarrollador FullStack"} />
        </Section>
    )
}