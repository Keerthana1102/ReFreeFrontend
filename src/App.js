import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Done from './components/Done';
import Error from './components/Error';
import Designers from './components/Designers';
import Newproject from './components/Newproject';
import Individualuser from './components/Individualuser';
import Trendingdesigns from './components/Trendingdesigns'
import Personalizedfeed from './components/Personalizedfeed';
import Projectpage from './components/Projectpage';

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
		<Route path = "/Designers" component = {Designers} />
		<Route path = "/Newproject" component = {Newproject} />
		<Route path = "/Trending" component = {Trendingdesigns} />
	  	<Route path="/individualuser" component={Individualuser} />
	        <Route path="/personalizedfeed" component={Personalizedfeed} />
			<Route path="/Projectpage" component = {Projectpage}/>
	  </Switch>
	</div>
    </BrowserRouter>
  );
}

export default App;
