import React, {useState} from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import './App.css';
import HobbitList from './components/HobbitList';
import {HobbitContext} from "./contexts/HobbitContext";


function App() {
  const [hobbits] = useState();
  return (
    <Router>
    <div className="App">
    <HobbitContext.Provider value={{ hobbits }}>
    <div className="header">
        <h1>Welcome to The Shire </h1>
      </div>
      <Switch>
      <HobbitList/>
      </Switch>
      </HobbitContext.Provider>
    </div>
  
  </Router>
  );
}

export default App;
