import { useEffect, useRef, useState } from 'react'
import OrgTitle from './components/Org'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Form from './components/Form/Form'
import Hero from './components/Hero/Hero'
import Modal from './components/Modal'
import Footer from './components/Footer'
import shortid from 'shortid'
import './App.css'

function App() {

  const [showForm, setShowForm] = useState(true);
  const [helpers, setHelpers] = useState([
    {
      id: shortid.generate(),
      name: "Jorge Moreno",
      position: "Desarrollador FullStack",
      photo: "https://github.com/JMMOLLER.png",
      team: "Front End"
    }
  ]);
  const [dataTeams, setDataTeams] = useState([
    {
      id: shortid.generate(),
      teamName: "Programación",
      colors: {
        primary: "#57c278",
        background: "#D9F7E9",
      }
    },
    {
      id: shortid.generate(),
      teamName: "Front End",
      colors: {
        primary: "#82CFFA",
        background: "#E8F8FF",
      }
    },
    {
      id: shortid.generate(),
      teamName: "Data Science",
      colors: {
        primary: "#A6D157",
        background: "#F0F8E2",
      }
    },
    {
      id: shortid.generate(),
      teamName: "Devops",
      colors: {
        primary: "#E06B69",
        background: "#F1616526",
      }
    },
    {
      id: shortid.generate(),
      teamName: "UX y Diseño",
      colors: {
        primary: "#DB6EBF",
        background: "#DC6EBE26",
      }
    },
    {
      id: shortid.generate(),
      teamName: "Móvil",
      colors: {
        primary: "#FFBA05",
        background: "#FFBA0526",
      }
    },
    {
      id: shortid.generate(),
      teamName: "Innovación y Gestión",
      colors: {
        primary: "#FF8A29",
        background: "#FF8C2A26",
      }
    },
  ]);
  const [showModal, setShowModal] = useState(false);
  const nodeOrgRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
  }, [showModal]);

  const handleRegister = (data) => {
    setHelpers([...helpers, data]);
  }

  const deleteHelper = (helperId) => {
    setHelpers(helpers.filter((helper) => helper.id !== helperId));
  }

  const changeTeamColor = (teamId, color) => {
    setDataTeams(dataTeams.map((item) => {
      if (item.id === teamId) {
        item.colors.primary = color;
        item.colors.background = color + "26";
      }
      return item;
    }))
  }

  return (
    <>
      {showModal && Modal({ setShowModal })}
      <Header>
        <Hero />
      </Header>
      <Main>
        <Form
          showForm={showForm}
          setShowForm={setShowForm}
          teams={dataTeams}
          handleRegister={handleRegister}
          nodeOrgRef={nodeOrgRef}
          setShowModal={setShowModal}
        />
        <OrgTitle
          showForm={showForm}
          setShowForm={setShowForm}
          teams={dataTeams}
          nodeOrgRef={nodeOrgRef}
          helpers={helpers}
          deleteHelper={deleteHelper}
          changeTeamColor={changeTeamColor}
        />
      </Main>
      <Footer />
    </>
  )
}



export default App
