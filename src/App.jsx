import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from "react-transition-group";
import { gql, useQuery, useSubscription, useMutation } from "@apollo/client";
import * as fetchGQPL from './Apollo/queryBuilders'
import Preloader from './components/Preloader/preloader'
import OrgTitle from './components/Org'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Form from './components/Form'
import Hero from './components/Hero/Hero'
import Modal, { ModalLive } from './components/Modal'
import Footer from './components/Footer'
import LocalDB from './db'
import './App.css'

function App() {

  const QUERY_HELPERS = gql`${fetchGQPL.buildQueryAllHelpers}`;
  const QUERY_TEAMS = gql`${fetchGQPL.buildQueryAllTeams}`;
  const SUBSCRIPTION_HELPERS = gql`${fetchGQPL.buildQuery({
    typeQuery: "subscription",
    operationName: "Subscription",
    query: "newHelper",
    queryFields: [
      "id",
      "name",
      "position",
      "photo",
      {
        team: [
          "teamName"
        ]
      }
    ]
  })}`;
  const ADD_HELPER = gql`${fetchGQPL.buildQuery({
    typeQuery: "mutation",
    operationName: "Mutation($input: HelperInput)",
    query: "createHelper(input: $input)",
    queryFields: [
      "id",
    ]
  })}`;

  const [showForm, setShowForm] = useState(true);
  const [helpers, setHelpers] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isRendered, setIsRendered] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [isLive, setIsLive] = useState(true);
  const nodeOrgRef = useRef(null);
  const preloaderRef = useRef(null);
  const {
    loading: loadingHelpers,
    error: errorHelpers,
    data: dataHelpers
  } = useQuery(QUERY_HELPERS);
  const {
    loading: loadingTeams,
    error: errorTeams,
    data: dataTeamsGQL
  } = useQuery(QUERY_TEAMS);
  const [
    addHelper,
    {
      data: dataMutation,
      loading: loadingMutation,
      error: errorMutation
    }
  ] = useMutation(ADD_HELPER);


  const { data, loading, error } = useSubscription(SUBSCRIPTION_HELPERS);

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(error);
      setIsLive(false);
      return;
    }
    setHelpers([...helpers, data.newHelper]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "";
  }, [showModal]);

  useEffect(() => {
    if(loadingMutation) return;
    if(errorMutation){
      console.error(errorMutation);
      return;
    }
  }, [dataMutation, loadingMutation, errorMutation]);

  useEffect(() => {
    handleDataFetching({
      loadingState: loadingHelpers,
      errorState: errorHelpers,
      dataState: dataHelpers,
      setDataState: setHelpers,
      dataType: "helpers"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingHelpers, errorHelpers, dataHelpers]);
  
  useEffect(() => {
    handleDataFetching({
      loadingState: loadingTeams,
      errorState: errorTeams,
      dataState: dataTeamsGQL,
      setDataState: setDataTeams,
      dataType: "teams"
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadingTeams, errorTeams, dataTeamsGQL]);

  const handleDataFetching = ({loadingState, errorState, dataState, setDataState, dataType}) => {
    if (loadingState) return;
    if (errorState) {
      setShowModal(true);
      setIsLive(false);
      console.error(errorState);
      loadFromLocalDB({dataType, setDataState});
      return;
    }
    if (dataState) {
      setDataState(dataState[dataType] || []);
    }
  };

  const loadFromLocalDB = ({dataType, setDataState}) => {
    setDataState(LocalDB[dataType]);
  };

  const handleRegister = (data) => {
    if(isLive){
      addHelper({ variables: { input: data } });
    } else {
      data.team = {
        teamName: dataTeams.find((team) => team.id === data.teamRef)?.teamName
      };
      setHelpers([...helpers, data]);
    }
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

  if(!isRendered){
    return(
      <CSSTransition
        in={showPreloader}
        timeout={1200}
        classNames="loaded"
        nodeRef={preloaderRef}
        unmountOnExit
        onExited={() => setIsRendered(true)}
      >
        <div className="preloader_container" ref={preloaderRef}>
          {showModal && 
            Modal({
              setShowModal,
              message: "No se pudo cargar los datos de los colaboradores y equipos pero no te preocupes, vamos a usar los datos locales 🙂.",
              title: "⚠️ ¡Ups!",
              customClickEvt: () => {setShowPreloader(false)}
            })
          }
          <Preloader
            errorHelpers={errorHelpers}
            errorTeams={errorTeams}
            setShowPreloader={setShowPreloader}
            loadingHelpers={loadingHelpers}
            loadingTeams={loadingTeams}
          />
        </div>
      </CSSTransition>
    )
  }

  return (
    <>
      {showModal && Modal({ setShowModal, isDefault: true })}
      <ModalLive isLive={isLive} />
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
