import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from "react-transition-group";
import { gql, useQuery, useSubscription, useMutation } from "@apollo/client";
import * as fetchGQPL from './Apollo/queryBuilders'
import Preloader from './components/Preloader/preloader'
import OrgTitle from './components/Org'
import Main from './components/Main/Main'
import Form from './components/Form'
import Hero from './components/Hero/Hero'
import Modal, { ModalLive, ModalSchemeColor } from './components/Modal'
import Footer from './components/Footer'
import LocalDB from './db'
import propTypes from 'prop-types'
import { useTranslation } from "react-i18next";
import { lngs } from './utils/i18n/i18n';
import './App.css'

function App({ isOnline }) {

  // NOTE: This could be abstracted to a custom hook

  const QUERY_HELPERS = gql`${fetchGQPL.buildQueryAllHelpers}`;
  const QUERY_TEAMS = gql`${fetchGQPL.buildQueryAllTeams}`;
  const SUBSCRIPTION_HELPERS = gql`${fetchGQPL.buildSubscriptionHelper}`;
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
  const [showModal, setShowModal] = useState({ show: false, payload: {}});
  const [isRendered, setIsRendered] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [animation, setAnimation] = useState(null);
  const [isDark, setIsDark] = useState(new Date().getHours() >= 18 || new Date().getHours() <= 6);
  const nodeOrgRef = useRef(null);
  const preloaderRef = useRef(null);
  const { t, i18n } = useTranslation();
  
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
    i18n.changeLanguage(localStorage.getItem("i18nextLng") || "es");
    document.documentElement.lang = i18n.language;
  }, [i18n]);

  useEffect(() => {
    handleSchemeMode(isDark, animation);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark]);

  const handleSchemeMode = (isDark, animation) => {
    if (isDark) {
      if(animation) {
        animation.setDirection(1);
        animation.play();
      }
      const properties = [
        {
          name: "--background-color",
          value: "#2c2c2c",
        },
        {
          name: "--text-color",
          value: "#FFF",
        },
        {
          name: "--shadow-color",
          value: "rgb(255 255 255 / 10%)",
        },
        {
          name: "--button-shadow-color",
          value: "rgba(255 255 255 / 40%)",
        }
      ]
      handleToggleSchemaColor(properties);
    } else {
      if(animation){
        animation.setDirection(-1);
        animation.play();
      }
      const properties = [
        {
          name: "--background-color",
          value: "#FFF",
        },
        {
          name: "--text-color",
          value: "#212121",
        },
        {
          name: "--shadow-color",
          value: "rgba(0, 0, 0, 0.1)",
        },
        {
          name: "--button-shadow-color",
          value: "rgba(0, 0, 0, 0.4)",
        }
      ]
      handleToggleSchemaColor(properties);
    }
  }

  const handleToggleSchemaColor = (properties) => {
    properties.forEach((property) => {
      document.documentElement.style.setProperty(
        property.name,
        property.value
      );
    });
  };

  useEffect(() => {
    if (loading) return;
    if (error) {
      console.error(error);
      return;
    }
    setHelpers([...helpers, data.newHelper]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, loading]);

  useEffect(() => {
    document.body.style.overflow = showModal.show ? "hidden" : "";
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
      setShowModal({
        show: true,
        payload: {
          title: t('modal.title.text_3'),
          message: t('modal.message.text_3'),
          button: t('modal.button'),
          customClickEvt: () => {setShowPreloader(false)}
        }
      });
      console.error(errorState);
      loadFromLocalDB({dataType, setDataState});
      return;
    }
    if (dataState) {
      if(dataType === "teams"){
        const mutableTeam = handleMutation({dataState, dataType});
        setDataState(mutableTeam || []);
      } else {
        setDataState(dataState[dataType] || []);
      }
    }
  };

  const handleMutation = ({dataState, dataType}) => {
    return dataState[dataType].map((team) => {
      const mutableTeam = {...team};
      mutableTeam.colors = {...team.colors};
      return mutableTeam;
    });
  };

  const loadFromLocalDB = ({dataType, setDataState}) => {
    setDataState(LocalDB[dataType]);
  };

  const handleRegister = (data) => {
    if(isOnline){
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
        console.log(item.colors, color);
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
          {showModal.show && 
            Modal({
              setShowModal,
              payload: showModal.payload
            })
          }
          <Preloader
            errorHelpers={errorHelpers}
            errorTeams={errorTeams}
            setShowPreloader={setShowPreloader}
            loadingHelpers={loadingHelpers}
            loadingTeams={loadingTeams}
            t={t}
          />
        </div>
      </CSSTransition>
    )
  }

  return (
    <>
      {showModal.show && Modal({ setShowModal, payload: showModal.payload, easterEgg: showModal.easterEgg })}
      <ModalLive isLive={isOnline} t={t} />
      <ModalSchemeColor isDark={isDark} setIsDark={setIsDark} handleSchemeMode={handleSchemeMode} animation={animation} setAnimation={setAnimation} t={t} />
      <Hero lngs={lngs} i18n={i18n} t={t} />
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
          t={t}
        />
        <OrgTitle
          showForm={showForm}
          setShowForm={setShowForm}
          teams={dataTeams}
          nodeOrgRef={nodeOrgRef}
          helpers={helpers}
          deleteHelper={deleteHelper}
          changeTeamColor={changeTeamColor}
          t={t}
        />
      </Main>
      <Footer t={t} />
    </>
  )
}

App.propTypes = {
  isOnline: propTypes.bool.isRequired
}

export default App
