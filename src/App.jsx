import { useState } from 'react'
import OrgTitle from './components/Org'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Form from './components/Form/Form'
import Hero from './components/Hero/Hero'
import './App.css'
import Modal from './components/Modal'
import { useEffect, useRef } from 'react'
import Footer from './components/Footer'

function App() {

  const [showForm, setShowForm] = useState(true);
  const [helpers, setHelpers] = useState([{name: "Jorge Moreno", position: "Desarrollador FullStack", photo: "https://github.com/JMMOLLER.png", team: "Programación"}]);
  const [showModal, setShowModal] = useState(false);
  const nodeOrgRef = useRef(null);

  const teams = [
    {
      teamName: "Programación",
      colors: {
        primary: "#57c278",
        background: "#D9F7E9",
      }
    },
    {
      teamName: "Front End",
      colors: {
        primary: "#82CFFA",
        background: "#E8F8FF",
      }
    },
    {
      teamName: "Data Science",
      colors: {
        primary: "#A6D157",
        background: "#F0F8E2",
      }
    },
    {
      teamName: "Devops",
      colors: {
        primary: "#E06B69",
        background: "#F1616526",
      }
    },
    {
      teamName: "UX y Diseño",
      colors: {
        primary: "#DB6EBF",
        background: "#DC6EBE26",
      }
    },
    {
      teamName: "Móvil",
      colors: {
        primary: "#FFBA05",
        background: "#FFBA0526",
      }
    },
    {
      teamName: "Innovación y Gestión",
      colors: {
        primary: "#FF8A29",
        background: "#FF8C2A26",
      }
    },
  ];

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
  }, [showModal]);

  const handleRegister = (data) => {
    setHelpers([...helpers, data]);
  }

  return (
    <>
      {showModal && Modal({ setShowModal })}
      <Header>
        <Hero />
      </Header>
      <Main>
        <Form showForm={showForm} setShowForm={setShowForm} teams={teams} handleRegister={handleRegister} nodeOrgRef={nodeOrgRef} setShowModal={setShowModal} />
        <OrgTitle showForm={showForm} setShowForm={setShowForm} teams={teams} nodeOrgRef={nodeOrgRef} helpers={helpers} />
      </Main>
      <Footer />
    </>
  )
}



export default App
