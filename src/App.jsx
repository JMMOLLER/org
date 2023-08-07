import { useState } from 'react'
import { OrgTitle } from './components/Org'
import Header from './components/Header/Header'
import Main from './components/Main/Main'
import Section from './components/Section'
import Form from './components/Form/Form'
import Hero from './components/Hero/Hero'
import Team from './components/Team/Team'
import './App.css'

function App() {

  const [showForm, setShowForm] = useState(true);
  const [hiddenForm, setHiddenShowForm] = useState(false);

  return (
    <>
      <Header>
        <Hero />
      </Header>
      <Main>
        { 
          !hiddenForm && 
          <Section className="section_form" >
            <Form showForm={showForm} />
          </Section>
        }
        <Section className="section_teams init" showForm={showForm} setHiddenShowForm={setHiddenShowForm} >
          <OrgTitle setShowForm={setShowForm} showForm={showForm} hiddenForm={hiddenForm}/>
          <Team />
        </Section>
      </Main>
    </>
  )
}

export default App
