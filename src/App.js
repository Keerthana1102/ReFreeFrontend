import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return (
    <BrowserRouter>
	<div>
	  <Switch>
	  	<Route path="/" component={Login} exact/>
	  	<Route path="/signup" component={Signup} />
	  </Switch>
	</div>
    </BrowserRouter>
  );
}

export default App;
