import Modal, { ModalLive, ModalSchemeColor } from './components/Modal'
import { useEffect, useRef, useState } from 'react'
import { CSSTransition } from "react-transition-group";
import { useTranslation } from "react-i18next";
import { lngs } from './utils/i18n/i18n';
import useApolloQuery from './hooks/useApolloQuery'
import useSchemeColor from './hooks/useSchemeColor'
import Preloader from './components/Preloader/preloader'
import OrgTitle from './components/Org'
import Main from './components/Main/Main'
import Form from './components/Form'
import Hero from './components/Hero/Hero'
import Footer from './components/Footer'
import propTypes from 'prop-types'

import './App.css'

function App({ isOnline }) {

  const [showForm, setShowForm] = useState(true);
  const [helpers, setHelpers] = useState([]);
  const [dataTeams, setDataTeams] = useState([]);
  const [showModal, setShowModal] = useState({ show: false, payload: {} });
  const [isRendered, setIsRendered] = useState(false);
  const [showPreloader, setShowPreloader] = useState(true);
  const [animation, setAnimation] = useState(null);
  const newSendHelper = useRef(null);
  const nodeOrgRef = useRef(null);
  const preloaderRef = useRef(null);
  const { t, i18n } = useTranslation();

  const { isDark, setIsDark, handleSchemeMode } = useSchemeColor({ animation });

  const {
    addHelper,
    errorHelpers,
    errorTeams,
    loadingHelpers,
    loadingTeams
  } = useApolloQuery({
    helpers,
    setHelpers,
    setDataTeams,
    setShowModal,
    setShowPreloader,
    t,
  })

  useEffect(() => {
    i18n.changeLanguage(localStorage.getItem("i18nextLng") || "es");
    document.documentElement.lang = i18n.language;
  }, [i18n]);

  useEffect(() => {
    try{
      const tmp = helpers.find((h) => h.id === newSendHelper.current);
      if(helpers.length === 0 || !tmp) return;
      const teamToFocus = dataTeams.find((team) => team.id === tmp.team?.id);
      const el = document.getElementById(teamToFocus.id);
      el.scrollIntoView({ behavior: "smooth" });
    }catch(e){
      console.error(e);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [helpers]);


  useEffect(() => {
    document.body.style.overflow = showModal.show ? "hidden" : "";
  }, [showModal]);

  const handleRegister = (data) => {
    const teamRef = dataTeams.find((team) => team.id === data.teamRef);
    newSendHelper.current = data.id;
    if(!teamRef) {
      setShowModal({ show: true, payload: { message: t('modal.message.text_4'), title: t('modal.title.text_4'), button: t('modal.button')  } });
    } else if(isOnline && teamRef.__typename) {
      addHelper({ variables: { input: data } });
    } else {
      data.team = {
        id: teamRef.id,
        teamName: teamRef.teamName
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
      <ModalSchemeColor
        isDark={isDark}
        setIsDark={setIsDark}
        handleSchemeMode={handleSchemeMode}
        animation={animation}
        setAnimation={setAnimation}
        t={t}
      />
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
