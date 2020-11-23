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
import Editproject from './components/Editproject';
import Newcomponent from './components/Newcomponent';
import Individualuser from './components/Individualuser';
import Trendingdesigns from './components/Trendingdesigns'
import Personalizedfeed from './components/Personalizedfeed';
import Projectpage from './components/Projectpage';
import Follow from './components/Follow';
import Favourites from './components/Favourites';
import Landingpage from './components/Landingpage';
import Unloggedproject from './components/Unloggedproject';
import Unloggeduser from './components/Unloggeduser';

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
		<Route path = "/Editproject" component = {Editproject} />
		<Route path = "/Trending" component = {Trendingdesigns} />
		<Route path = "/Favourites" component = {Favourites} />
	  	<Route path="/individualuser" component={Individualuser} />
	    <Route path="/personalizedfeed" component={Personalizedfeed} />
		<Route path="/Projectpage" component = {Projectpage}/>
		<Route path = "/Newcomponent" component = {Newcomponent} />
	  	<Route path="/follow" component={Follow} />
	  	<Route path="/Landingpage" component={Landingpage} />
		<Route path="/Unloggedproject" component={Unloggedproject} />
	  	<Route path="/Unloggeduser" component={Unloggeduser} />
	  </Switch>
	</div>
    </BrowserRouter>
  );
}

export default App;
