import React from 'react';
import logo from './logo.svg';
import './App.css';

import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Done from './components/Done';
import Error from './components/Error';

function App() {
  return (
    <BrowserRouter>
	<div>
	  <Switch>
	  	<Route path="/" component={Login} exact/>
	  	<Route path="/signup" component={Signup} />
                <Route path="/profile" component={Profile} />
	  	<Route path="/done" component={Done} />
	  	<Route path="/error" component={Error} />
	  </Switch>
	</div>
    </BrowserRouter>
  );
}

export default App;
