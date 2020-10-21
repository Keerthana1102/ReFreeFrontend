import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';

function App() {
  return (
    <BrowserRouter>
	<div>
	  <Switch>
	  	<Route path="/" component={Login} exact/>
	  </Switch>
	</div>
    </BrowserRouter>
  );
}

export default App;
