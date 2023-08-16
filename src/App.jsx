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
    const apiUrl = import.meta.env.VITE_HASURA_GRAPHQL_ENDPOINT;
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-hasura-admin-secret": import.meta.env.VITE_HASURA_ADMIN_SECRET
      }
    }
    const handleFetch = async (url, options) => {
      try {
        const res = await fetch(url, options);
        if(!res.ok) throw new Error(getStatusText(res.status));
        const data = await res.json();
        return data;
      } catch (error) {
        console.error(error);
      }
    }
    handleFetch(apiUrl+"getAllTeams", options)
      .then((data) => {
        if(!data) return;
        setDataTeams(data.Teams)
      }).catch((error) => 
        console.error(error)
      );
    
    handleFetch(apiUrl+"getAllHelpers", options)
      .then((data) => {
        if(!data) return;
        setHelpers(data.Helpers)
      }).catch((error) => 
        console.error(error)
      );
  }, [setDataTeams, setHelpers]);

  function getStatusText(statusCode) {
    switch (statusCode) {
      case 400:
        return 'Bad Request';
      case 401:
        return 'Unauthorized';
      case 403:
        return 'Forbidden';
      case 404:
        return 'Not Found';
      case 500:
        return 'Internal Server Error';
      default:
        return `Status ${statusCode}`;
    }
  }

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
