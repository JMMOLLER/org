import { useEffect, useRef, useState } from 'react'
import OrgTitle from './components/Org'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Form from './components/Form'
import Hero from './components/Hero/Hero'
import Modal from './components/Modal'
import Footer from './components/Footer'
import './App.css'

function App() {

  const [showForm, setShowForm] = useState(true);
  const [helpers, setHelpers] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const nodeOrgRef = useRef(null);

  useEffect(() => {
    const apiUrl = "<your-api-endpoint>";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": "<your-admin-secret>"
      }
    }
    const handleFetch = async (url, options) => {
      try {
        const res = await fetch(url, options);
        const data = await res.json();
        console.log(data);
        return data;
      } catch (error) {
        console.log(error);
      }
    }
    handleFetch(apiUrl+"getAllTeams", options).then((data) => setDataTeams(data.Teams));
    handleFetch(apiUrl+"getAllHelpers", options).then((data) => setHelpers(data.Helpers));
  }, []);

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
        item.colors.background = generateBgColor(color);
      }
      return item;
    }))
  }

  const generateBgColor = (color) => {
    return color + "26";
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
          generateBgColor={generateBgColor}
          setDataTeams={setDataTeams}
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
