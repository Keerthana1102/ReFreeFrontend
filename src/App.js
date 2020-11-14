import React from 'react';
import logo from './logo.svg';
import './App.css';
import Mainpage from './components/Mainpage/Mainpage'
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Done from './components/Done';
import Error from './components/Error';
import Individualuser from './components/Individualuser';

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
		<Route path = "/Trending" component = {Mainpage} />
	  	<Route path="/individualuser" component={Individualuser} />
	  </Switch>
	</div>
    </BrowserRouter>
  );
}

export default App;
