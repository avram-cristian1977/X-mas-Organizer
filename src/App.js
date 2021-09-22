
import './App.css';
import {Route, Switch, Redirect} from 'react-router'
import Homepage from './pages/Homepage'
import Contact from './pages/Contact';
import ListOfGifts from './pages/Listsofgifts';
import Navigation from './pages/Navigation'
import Signup from './pages/Signup'
import Signin from './pages/Signin'
import { useState } from 'react';

const App = () =>{

  const [name, setName] = useState("")
    
  const nameHandler = (name) => {
      setName(name)
  }

 
  return (
    <>
      <Navigation name={name}/>
    <Switch>
      <Route path='/' exact>
          <Redirect to="/homepage"></Redirect>
      </Route>
      <Route path="/homepage" exact>
          <Homepage/>
      </Route>
      <Route path="/contact">
          <Contact/>
      </Route>
      <Route path="/listsofgifts/:localId" exact>
          <ListOfGifts onSaveName = {nameHandler}/>
      </Route>
      <Route path="/signup">
          <Signup/>
      </Route>
      <Route path="/signin">
          <Signin/>
      </Route>

    </Switch>
  </>
  );
}

export default App;
